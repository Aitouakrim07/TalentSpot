import React from 'react';
import JobCard from './JobCard';

const JobList = ({ jobs, onJobClick, selectedJobId }) => {
    if (jobs.length === 0) {
        return <div className="text-center" style={{ padding: '40px' }}>Aucune offre ne correspond à vos critères.</div>;
    }

    return (
        <div className="grid" style={{ gap: '16px' }}>
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} onClick={onJobClick} selected={selectedJobId === job.id} />
            ))}
        </div>
    );
};

export default JobList;
