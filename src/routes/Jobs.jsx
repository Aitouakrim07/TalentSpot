import React, { useEffect, useMemo, useState } from 'react';
import JobList from '../components/JobList';
import JobFilters from '../components/JobFilters';
import JobDetailModal from '../components/JobDetailModal';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [filters, setFilters] = useState({ keyword: '', country: '', city: '', contract: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch jobs from API
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch('/api/jobs');
                if (!res.ok) throw new Error('Failed to fetch jobs');
                const data = await res.json();
                // Normalize _id to id for frontend compatibility if needed
                const normalizedData = data.map(job => ({ ...job, id: job._id }));
                setJobs(normalizedData);
                setFilteredJobs(normalizedData);
                if (normalizedData.length > 0) setSelectedJob(normalizedData[0]);
            } catch (err) {
                setError('Erreur de chargement des offres.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    useEffect(() => {
        let result = jobs;

        if (filters.keyword) {
            const lowerKw = filters.keyword.toLowerCase();
            result = result.filter((job) =>
                job.title.toLowerCase().includes(lowerKw) ||
                job.description.toLowerCase().includes(lowerKw) ||
                (job.keywords && job.keywords.some((k) => k.toLowerCase().includes(lowerKw)))
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

    const jobsLayoutStyle = useMemo(() => ({
        display: 'grid',
        gridTemplateColumns: '1.15fr 1.85fr',
        gap: '24px',
        alignItems: 'start'
    }), []);

    if (loading) return <div className="container text-center" style={{ padding: '50px' }}>Chargement...</div>;
    if (error) return <div className="container text-center" style={{ padding: '50px', color: 'red' }}>{error}</div>;

    return (
        <div className="container" style={{ padding: '24px 0' }}>
            <h1 className="text-center mb-20" style={{ color: 'var(--primary-color)' }}>Offres d'emploi</h1>

            <div style={jobsLayoutStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <JobFilters filters={filters} setFilters={setFilters} />
                    <JobList jobs={filteredJobs} onJobClick={setSelectedJob} selectedJobId={selectedJob?.id} />
                </div>

                <JobDetailModal job={selectedJob} />
            </div>
        </div>
    );
};

export default Jobs;
