import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './routes/Home';
import Jobs from './routes/Jobs';
import Candidates from './routes/Candidates';
import Recruiters from './routes/Recruiters';
import About from './routes/About';
import Contact from './routes/Contact';
import Login from './routes/Login';
import AdminJobs from './routes/AdminJobs';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Navbar />
                    <main style={{ flex: 1 }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/jobs" element={<Jobs />} />
                            <Route path="/candidates" element={<Candidates />} />
                            <Route path="/recruiters" element={<Recruiters />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/admin" element={<AdminJobs />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
