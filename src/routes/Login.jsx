import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css'; // Ensure styles are loaded

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.message || data.error);

            if (isLogin) {
                login(data.token, { username: data.username, role: data.role });
                navigate('/admin');
            } else {
                alert('Compte créé ! Vous pouvez vous connecter.');
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
            <h2>{isLogin ? 'Connexion Admin' : 'Créer un compte'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label>Nom d'utilisateur</label>
                    <input 
                        type="text" 
                        required 
                        value={formData.username}
                        onChange={e => setFormData({...formData, username: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label>Mot de passe</label>
                    <input 
                        type="password" 
                        required 
                        value={formData.password}
                        onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                    {isLogin ? 'Se connecter' : "S'inscrire"}
                </button>
            </form>
            <p style={{ marginTop: '20px', textAlign: 'center' }}>
                <button 
                    onClick={() => setIsLogin(!isLogin)} 
                    style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
                >
                    {isLogin ? "Pas de compte ? S'inscrire" : 'Déjà un compte ? Se connecter'}
                </button>
            </p>
        </div>
    );
};

export default Login;

