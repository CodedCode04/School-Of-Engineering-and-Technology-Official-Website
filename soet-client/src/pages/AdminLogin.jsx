import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Turnstile } from '@marsidev/react-turnstile';
import '../styles/admin-login.css';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState('');
    const turnstileRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Admin Login - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);

    const submitWithRetry = async (payload, retryCount = 1) => {
        try {
            return await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/login`, payload, {
                timeout: 10000
            });
        } catch (error) {
            if (retryCount > 0 && error.code === 'ECONNABORTED') {
                setStatus({ type: 'info', message: 'Waking up the server... please wait.' });
                await new Promise(resolve => setTimeout(resolve, 2000));
                return submitWithRetry(payload, retryCount - 1);
            }
            throw error;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!turnstileToken) {
            setStatus({ type: 'error', message: 'Please complete the CAPTCHA.' });
            return;
        }

        setIsLoading(true);
        setStatus({ type: 'info', message: 'Signing in...' });

        try {
            const response = await submitWithRetry({ email, password, turnstileToken });
            const { token } = response.data;
            
            // Store JWT in memory as requested (window object or just pass to global state, 
            // but for simplicity we will store it in sessionStorage or memory variable. 
            // The prompt says "stores the JWT in memory (not localStorage; explain the tradeoff)".
            // Let's use sessionStorage for memory during session, or purely memory.
            window.adminJwtToken = token;
            
            setStatus({ type: 'success', message: 'Login successful! Redirecting...' });
            
            setTimeout(() => {
                navigate('/admin-dashboard');
            }, 1000);
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.error || 'Invalid credentials.' });
        } finally {
            setIsLoading(false);
            setTurnstileToken('');
            if (turnstileRef.current) {
                turnstileRef.current.reset();
            }
        }
    };

    return (
        <>
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>Admin Access</h1>
                    <p>Secure Portal for SoET Administration</p>
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link> <span>/</span> Admin Login
                    </nav>
                </div>
            </section>

            {/* Admin Login Section */}
            <section className="admin-login-section">
                <div className="container">
                    <div className="admin-login-container">
                        <div className="login-header">
                            <img src="/assets/images/Vikram-university_Logo.png" alt="SoET Logo" />
                            <h1><i className="fas fa-user-shield"></i> Admin Login</h1>
                            <p>School of Engineering and Technology</p>
                            <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '5px' }}>Samrat Vikramaditya Vishwavidyalaya, Ujjain</p>
                        </div>

                        {status.message && (
                            <div className={`alert alert-${status.type}`} style={{ padding: '15px', marginBottom: '20px', borderRadius: '5px', backgroundColor: status.type === 'success' ? '#d4edda' : status.type === 'error' ? '#f8d7da' : '#e2e3e5', color: status.type === 'success' ? '#155724' : status.type === 'error' ? '#721c24' : '#383d41' }}>
                                {status.type === 'success' && <i className="fas fa-check-circle"></i>}
                                {' '}{status.message}
                            </div>
                        )}

                        <form id="adminLoginForm" onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="adminEmail">
                                    <i className="fas fa-envelope"></i> Email Address
                                </label>
                                <input type="email" id="adminEmail" name="adminEmail" required 
                                       placeholder="Enter your admin email" autoComplete="email"
                                       value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="adminPassword">
                                    <i className="fas fa-lock"></i> Password
                                </label>
                                <input type="password" id="adminPassword" name="adminPassword" required 
                                       placeholder="Enter your password" autoComplete="current-password"
                                       value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className="form-group" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                                <Turnstile 
                                    ref={turnstileRef}
                                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} 
                                    onSuccess={(token) => setTurnstileToken(token)}
                                    onError={() => setStatus({ type: 'error', message: 'CAPTCHA error. Please try again.' })}
                                    onExpire={() => {
                                        setTurnstileToken('');
                                        setStatus({ type: 'error', message: 'CAPTCHA expired. Please complete it again.' });
                                    }}
                                />
                            </div>

                            <button type="submit" className="btn-submit" disabled={isLoading || !turnstileToken}>
                                {isLoading ? <><i className="fas fa-spinner fa-spin"></i> Signing In...</> : <><i className="fas fa-sign-in-alt"></i> Sign In</>}
                            </button>
                        </form>

                        <div className="back-home">
                            <Link to="/">
                                <i className="fas fa-arrow-left"></i> Back to Homepage
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

