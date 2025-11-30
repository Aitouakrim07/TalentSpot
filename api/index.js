import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import connectDB from './db.js';
import Job from './models/Job.js';
import Candidature from './models/Candidature.js';
import User from './models/User.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB
connectDB();

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'candidatures',
        allowed_formats: ['pdf', 'doc', 'docx'],
        resource_type: 'raw' 
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

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const requireRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};

// --- ROUTES ---

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', env: process.env.NODE_ENV });
});

// AUTH
app.post('/api/auth/register', async (req, res) => {
    // Simple protection: only allow if no users exist OR if authenticated as admin
    // For initial setup, we'll allow it if DB is empty.
    try {
        const count = await User.countDocuments();
        if (count > 0) {
             // If users exist, require admin token (TODO: implement checking header here if strictly needed, 
             // but for now we'll just block public registration if users exist to prevent abuse)
             // Ideally, you'd check auth here. For simplicity in this 'free stack' tutorial:
             return res.status(403).json({ message: "Registration is closed. Ask an admin." });
        }

        const { username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role: role || 'recruiter' });
        await user.save();
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, role: user.role, username: user.username });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// JOBS
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/jobs', authenticateToken, requireRole('recruiter'), async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/jobs/:id', authenticateToken, requireRole('admin'), async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CANDIDATURE (Public + Upload)
app.post('/api/candidature', upload.single('cv'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Aucun fichier CV envoyé.' });
        }

        const { name, email, country, city, domain, coverLetter, jobId, jobTitle } = req.body;

        // Save to DB
        const newCandidature = new Candidature({
            name, email, country, city, domain, coverLetter, jobId, jobTitle,
            cvUrl: req.file.path // Cloudinary URL
        });
        await newCandidature.save();

        // Send Email
        const emailText = `Nouvelle candidature:
Nom: ${name}
Email: ${email}
Pays/Ville: ${country} - ${city}
Domaine: ${domain}
Offre: ${jobTitle || 'Non spécifiée'} (id: ${jobId || 'N/A'})

Lettre de motivation:
${coverLetter || 'Non fournie'}

Lien CV: ${req.file.path}`; // Note: path is the URL in CloudinaryStorage

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

