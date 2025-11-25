import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadsDir = path.join(__dirname, 'uploads');
const candidatureFile = path.join(__dirname, 'candidatures.json');
const contactFile = path.join(__dirname, 'contact-messages.json');

const ensureFile = (filePath, initial = []) => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(initial, null, 2));
    }
};

ensureFile(candidatureFile);
ensureFile(contactFile);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Format de fichier non supporté. Utilisez PDF, DOC ou DOCX.'));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }
});

const EMAIL_TO = process.env.EMAIL_TO || 'othmanaitouakrim07@gmail.com';

const getTransporter = () => {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
        console.warn('SMTP non configuré, les emails seront journalisés uniquement.');
        return null;
    }
    return nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        }
    });
};

const transporter = getTransporter();

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.post('/api/candidature', upload.single('cv'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Aucun fichier CV envoyé.' });
        }

        const { name, email, country, city, domain, coverLetter = '', jobId = '', jobTitle = '' } = req.body;

        const newCandidature = {
            id: Date.now(),
            name,
            email,
            country,
            city,
            domain,
            coverLetter,
            jobId,
            jobTitle,
            cvFile: req.file.filename,
            date: new Date().toISOString()
        };

        const data = JSON.parse(fs.readFileSync(candidatureFile));
        data.push(newCandidature);
        fs.writeFileSync(candidatureFile, JSON.stringify(data, null, 2));

        const emailText = `Nouvelle candidature:
Nom: ${name}
Email: ${email}
Pays/Ville: ${country} - ${city}
Domaine: ${domain}
Offre: ${jobTitle || 'Non spécifiée'} (id: ${jobId || 'N/A'})

Lettre de motivation:
${coverLetter || 'Non fournie'}

Fichier CV: ${newCandidature.cvFile}`;

        if (transporter) {
            await transporter.sendMail({
                from: EMAIL_TO,
                to: EMAIL_TO,
                subject: `Candidature reçue - ${name} - ${jobTitle || 'Candidature spontanée'}`,
                text: emailText
            });
        } else {
            console.log('Email (simulation) =>\n', emailText);
        }

        console.log(`Nouvelle candidature reçue de ${name} (${email})`);
        res.json({ success: true, message: 'Candidature reçue avec succès.' });
    } catch (error) {
        console.error('Erreur lors du traitement de la candidature:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, type, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Champs requis manquants.' });
        }

        const newMessage = {
            id: Date.now(),
            name,
            email,
            type,
            message,
            date: new Date().toISOString()
        };

        const messages = JSON.parse(fs.readFileSync(contactFile));
        messages.push(newMessage);
        fs.writeFileSync(contactFile, JSON.stringify(messages, null, 2));

        const emailText = `Nouveau message de contact:
Nom: ${name}
Email: ${email}
Type: ${type}

Message:
${message}`;

        if (transporter) {
            await transporter.sendMail({
                from: EMAIL_TO,
                to: EMAIL_TO,
                subject: `Contact - ${type || 'Autre'} - ${name}`,
                text: emailText
            });
        } else {
            console.log('Email contact (simulation) =>\n', emailText);
        }

        res.json({ success: true, message: 'Message envoyé.' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message de contact:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
});

app.use('/uploads', express.static(uploadsDir));

app.listen(PORT, () => {
    console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
    console.log(`Pour tester l'API : POST http://localhost:${PORT}/api/candidature`);
});

/*
  COMMENT INSTALLER ET LANCER :

  1. Installer les dépendances :
     npm install

  2. Lancer le backend :
     node server.js

  3. Lancer le frontend (dans un autre terminal) :
     npm run dev

  4. Ouvrir http://localhost:5173 (ou le port indiqué par Vite)

  Le proxy Vite est déjà configuré pour rediriger /api vers http://localhost:3000,
  donc le formulaire CV enverra vers http://localhost:3000/api/candidature sans changement supplémentaire.

  Pour l'envoi d'e-mails (candidatures et contact), définir les variables :
    SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
    EMAIL_TO (déjà renseigné par défaut)
  Sans ces variables, les e-mails sont simplement journalisés côté serveur.
*/
