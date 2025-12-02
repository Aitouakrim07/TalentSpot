import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import nodemailer from 'nodemailer';
import { ClerkExpressRequireAuth, createClerkClient } from '@clerk/clerk-sdk-node';

import prisma from './lib/prisma.js';

dotenv.config();

const app = express();
const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Compute filename based on original name but safe
        const originalName = file.originalname.replace(/\.[^/.]+$/, "");
        
        // Return format based on mimetype or original extension to preserve it
        let format = 'pdf';
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') format = 'docx';
        if (file.mimetype === 'application/msword') format = 'doc';

        return {
            folder: 'candidatures',
            resource_type: 'auto', // Let Cloudinary detect
            public_id: `${Date.now()}-${originalName}`,
            format: format // Force the correct extension
        };
    }
});

const upload = multer({ storage: storage });

// Nodemailer Config
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const EMAIL_TO = process.env.EMAIL_TO || process.env.SMTP_USER;

// Helper: Check Role
const requireRole = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const { userId } = req.auth;
            if (!userId) return res.status(401).json({ message: 'Unauthorized' });

            const user = await clerkClient.users.getUser(userId);
            const userRole = user.publicMetadata.role;

            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            next();
        } catch (error) {
            console.error('Role Check Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
};

// --- ROUTES ---

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', env: process.env.NODE_ENV });
});

// JOBS
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await prisma.job.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Protect: Only 'recruiter' or 'admin' can add jobs
app.post('/api/jobs', 
    ClerkExpressRequireAuth(), 
    requireRole(['recruiter', 'admin']), 
    async (req, res) => {
        try {
            const job = await prisma.job.create({
                data: req.body
            });
            res.status(201).json(job);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

app.delete('/api/jobs/:id', 
    ClerkExpressRequireAuth(), 
    requireRole(['admin']), 
    async (req, res) => {
        try {
            await prisma.job.delete({
                where: { id: req.params.id }
            });
            res.json({ message: 'Job deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// CANDIDATURE (Public + Upload)
app.post('/api/candidature', upload.single('cv'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Aucun fichier CV envoyé.' });
        }

        const { name, email, country, city, domain, coverLetter, jobId, jobTitle } = req.body;

        // Save to DB via Prisma
        await prisma.candidature.create({
            data: {
                name, email, country, city, domain, coverLetter, jobId, jobTitle,
                cvUrl: req.file.path
            }
        });

        // Send Email
        const emailText = `Nouvelle candidature:
Nom: ${name}
Email: ${email}
Pays/Ville: ${country} - ${city}
Domaine: ${domain}
Offre: ${jobTitle || 'Non spécifiée'} (id: ${jobId || 'N/A'})

Lettre de motivation:
${coverLetter || 'Non fournie'}

Lien CV: ${req.file.path}`;

        await transporter.sendMail({
            from: EMAIL_TO,
            to: EMAIL_TO,
            subject: `Candidature reçue - ${name} - ${jobTitle || 'Spontanée'}`,
            text: emailText
        });

        res.json({ success: true, message: 'Candidature reçue avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
});

// CONTACT
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, type, message } = req.body;
        
        const emailText = `Nouveau message de contact:
Nom: ${name}
Email: ${email}
Type: ${type}

Message:
${message}`;

        await transporter.sendMail({
            from: EMAIL_TO,
            to: EMAIL_TO,
            subject: `Contact - ${type} - ${name}`,
            text: emailText
        });

        res.json({ success: true, message: 'Message envoyé.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
});

export default app;
