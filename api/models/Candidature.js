import mongoose from 'mongoose';

const CandidatureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    country: String,
    city: String,
    domain: String,
    coverLetter: String,
    jobId: String,
    jobTitle: String,
    cvUrl: { type: String, required: true }, // Changed from filename to URL (Cloudinary)
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Candidature || mongoose.model('Candidature', CandidatureSchema);

