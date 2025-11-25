import React from 'react';

const JobCard = ({ job, onClick, selected }) => {
    return (
        <div
            className="job-card"
            onClick={() => onClick(job)}
            style={{
                background: 'white',
                padding: '20px',
                borderRadius: 'var(--radius)',
                boxShadow: selected ? '0 6px 12px rgba(0,0,0,0.12)' : 'var(--shadow)',
                cursor: 'pointer',
                transition: 'transform 0.2s, border-color 0.2s',
                border: selected ? '2px solid var(--primary-color)' : '1px solid transparent'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <h3 style={{ color: 'var(--primary-color)', margin: 0 }}>{job.title}</h3>
                <span style={{
                    background: '#e3f2fd',
                    color: 'var(--primary-color)',
                    padding: '5px 10px',
                    borderRadius: '20px',
                    fontSize: '0.8rem'
                }}>
                    {job.contract}
                </span>
            </div>
            <h4 style={{ color: '#666', marginBottom: '10px' }}>{job.company} - {job.city}, {job.country}</h4>
            <p style={{ marginBottom: '15px', color: '#444' }}>{job.shortDescription}</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {job.keywords.map((kw, index) => (
                    <span key={index} style={{
                        background: '#f5f5f5',
                        color: '#666',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8rem'
                    }}>
                        {kw}
                    </span>
                ))}
            </div>
            <style>{`
        .job-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary-color);
        }
      `}</style>
        </div>
    );
};

export default JobCard;
