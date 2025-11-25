import React, { useEffect, useMemo, useState } from 'react';
import { jobs as jobsData } from '../data/jobs';
import JobList from '../components/JobList';
import JobFilters from '../components/JobFilters';
import JobDetailModal from '../components/JobDetailModal';

const initialNewJob = {
    title: '',
    company: '',
    country: 'Maroc',
    city: '',
    contract: 'CDI',
    domain: '',
    salary: '',
    shortDescription: '',
    description: '',
    keywords: ''
};

const Jobs = () => {
    const [jobs, setJobs] = useState(jobsData);
    const [filteredJobs, setFilteredJobs] = useState(jobsData);
    const [selectedJob, setSelectedJob] = useState(jobsData[0] || null);
    const [filters, setFilters] = useState({ keyword: '', country: '', city: '', contract: '' });
    const [newJob, setNewJob] = useState(initialNewJob);
    const [jobStatus, setJobStatus] = useState('');

    useEffect(() => {
        let result = jobs;

        if (filters.keyword) {
            const lowerKw = filters.keyword.toLowerCase();
            result = result.filter((job) =>
                job.title.toLowerCase().includes(lowerKw) ||
                job.description.toLowerCase().includes(lowerKw) ||
                job.keywords.some((k) => k.toLowerCase().includes(lowerKw))
            );
        }

        if (filters.country) result = result.filter((job) => job.country === filters.country);
        if (filters.city) result = result.filter((job) => job.city.toLowerCase().includes(filters.city.toLowerCase()));
        if (filters.contract) result = result.filter((job) => job.contract === filters.contract);

        setFilteredJobs(result);
        if (result.length && (!selectedJob || !result.find((j) => j.id === selectedJob.id))) {
            setSelectedJob(result[0]);
        } else if (result.length === 0) {
            setSelectedJob(null);
        }
    }, [filters, jobs]);

    const handleNewJobChange = (e) => {
        const { name, value } = e.target;
        setNewJob((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddJob = (e) => {
        e.preventDefault();
        const keywordsArray = newJob.keywords.split(',').map((k) => k.trim()).filter(Boolean);
        const createdJob = {
            ...newJob,
            id: Date.now(),
            keywords: keywordsArray,
        };
        setJobs((prev) => [createdJob, ...prev]);
        setNewJob(initialNewJob);
        setJobStatus('Offre ajoutée. Elle est visible dans la liste.');
        setSelectedJob(createdJob);
        setTimeout(() => setJobStatus(''), 3000);
    };

    const jobsLayoutStyle = useMemo(() => ({
        display: 'grid',
        gridTemplateColumns: '1.15fr 1.85fr',
        gap: '24px',
        alignItems: 'start'
    }), []);

    return (
        <div className="container" style={{ padding: '24px 0' }}>
            <h1 className="text-center mb-20" style={{ color: 'var(--primary-color)' }}>Offres d'emploi</h1>

            <div style={jobsLayoutStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <JobFilters filters={filters} setFilters={setFilters} />

                    <div style={{ background: 'white', padding: '16px', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                        <h3 style={{ marginBottom: '10px' }}>Ajouter une offre</h3>
                        {jobStatus && <p style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>{jobStatus}</p>}
                        <form onSubmit={handleAddJob} className="grid grid-3 gap-20">
                            <div className="form-group">
                                <label>Titre</label>
                                <input name="title" value={newJob.title} onChange={handleNewJobChange} required />
                            </div>
                            <div className="form-group">
                                <label>Entreprise</label>
                                <input name="company" value={newJob.company} onChange={handleNewJobChange} required />
                            </div>
                            <div className="form-group">
                                <label>Pays</label>
                                <select name="country" value={newJob.country} onChange={handleNewJobChange}>
                                    <option value="Maroc">Maroc</option>
                                    <option value="France">France</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Ville</label>
                                <input name="city" value={newJob.city} onChange={handleNewJobChange} required />
                            </div>
                            <div className="form-group">
                                <label>Contrat</label>
                                <select name="contract" value={newJob.contract} onChange={handleNewJobChange}>
                                    <option value="CDI">CDI</option>
                                    <option value="CDD">CDD</option>
                                    <option value="Stage">Stage</option>
                                    <option value="Alternance">Alternance</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Domaine</label>
                                <input name="domain" value={newJob.domain} onChange={handleNewJobChange} required />
                            </div>
                            <div className="form-group">
                                <label>Salaire indicatif</label>
                                <input name="salary" value={newJob.salary} onChange={handleNewJobChange} required />
                            </div>
                            <div className="form-group">
                                <label>Mots-clés (séparés par des virgules)</label>
                                <input name="keywords" value={newJob.keywords} onChange={handleNewJobChange} placeholder="React, Marketing, DevOps" />
                            </div>
                            <div className="form-group" style={{ gridColumn: '1 / span 3' }}>
                                <label>Résumé court</label>
                                <input name="shortDescription" value={newJob.shortDescription} onChange={handleNewJobChange} required />
                            </div>
                            <div className="form-group" style={{ gridColumn: '1 / span 3' }}>
                                <label>Description détaillée</label>
                                <textarea name="description" rows="3" value={newJob.description} onChange={handleNewJobChange} required></textarea>
                            </div>
                            <div style={{ gridColumn: '1 / span 3' }}>
                                <button className="btn btn-secondary" type="submit" style={{ width: '100%' }}>Publier l'offre</button>
                            </div>
                        </form>
                    </div>

                    <JobList jobs={filteredJobs} onJobClick={setSelectedJob} selectedJobId={selectedJob?.id} />
                </div>

                <JobDetailModal job={selectedJob} />
            </div>
        </div>
    );
};

export default Jobs;
