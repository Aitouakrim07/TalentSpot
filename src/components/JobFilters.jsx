import React from 'react';

const JobFilters = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="job-filters" style={{
            background: 'white',
            padding: '20px',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow)',
            marginBottom: '30px'
        }}>
            <div className="grid grid-3 gap-20">
                <div className="form-group">
                    <label>Mots-clés</label>
                    <input
                        type="text"
                        name="keyword"
                        placeholder="Ex: React, Marketing..."
                        value={filters.keyword}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Pays</label>
                    <select name="country" value={filters.country} onChange={handleChange}>
                        <option value="">Tous</option>
                        <option value="Maroc">Maroc</option>
                        <option value="France">France</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Ville</label>
                    <input
                        type="text"
                        name="city"
                        placeholder="Ex: Paris, Casablanca"
                        value={filters.city}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Type de contrat</label>
                    <select name="contract" value={filters.contract} onChange={handleChange}>
                        <option value="">Tous</option>
                        <option value="CDI">CDI</option>
                        <option value="CDD">CDD</option>
                        <option value="Stage">Stage</option>
                        <option value="Alternance">Alternance</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default JobFilters;
