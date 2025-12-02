import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './routes/Home';
import Jobs from './routes/Jobs';
import Candidates from './routes/Candidates';
// import Recruiters from './routes/Recruiters'; // Hidden for now
import About from './routes/About';
import Contact from './routes/Contact';
import Login from './routes/Login';
import Register from './routes/Register';
import AdminJobs from './routes/AdminJobs';
import { Protect } from './components/Protect';

function App() {
    return (
        <Router>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar />
                <main style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/candidates" element={<Candidates />} />
                        {/* <Route path="/recruiters" element={<Recruiters />} /> */}
                        <Route path="/recruiters" element={<Navigate to="/" replace />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        
                        {/* Protected Route: Only Admin or Recruiter */}
                        <Route
                            path="/admin"
                            element={
                                <Protect roles={['admin', 'recruiter']}>
                                    <AdminJobs />
                                </Protect>
                            }
                        />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
