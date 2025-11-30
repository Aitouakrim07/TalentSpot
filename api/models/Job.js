import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    contract: { type: String, required: true },
    domain: { type: String, required: true },
    salary: String,
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    keywords: [String],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);

