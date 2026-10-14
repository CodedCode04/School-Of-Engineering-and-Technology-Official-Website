import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthLayout, Field, Input, Button, Alert } from '../components/shared';
import toast from 'react-hot-toast';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showHelpBox, setShowHelpBox] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Portal Login - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        
        const cleanEmail = email.trim();
        if (!cleanEmail || !password) {
            const msg = 'Please enter both institutional email and account password.';
            setErrorMessage(msg);
            toast.error(msg);
            return;
        }

        setIsSubmitting(true);
        try {
            const user = await login(cleanEmail, password);
            toast.success('Login successful! Redirecting...');
            
            if (user.status !== 'approved' && user.role !== 'admin') {
                navigate('/awaiting-approval');
                return;
            }

            switch(user.role) {
                case 'admin': navigate('/admin-dashboard'); break;
                case 'hod': navigate('/hod-dashboard'); break;
                case 'teacher': navigate('/teacher-dashboard'); break;
                case 'student': navigate('/student-dashboard'); break;
                case 'tpo': navigate('/tpo-dashboard'); break;
                case 'alumni': navigate('/alumni-dashboard'); break;
                default: navigate('/');
            }
        } catch (error) {
            const failMsg = error.response?.data?.error || 'Invalid email or password. Please verify your credentials.';
            setErrorMessage(failMsg);
            toast.error(failMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout
            title="Portal Sign In"
            subtitle="Enter your institutional credentials to proceed"
            error={errorMessage}
            cardMaxWidth="520px"
        >
            <div className="soet-auth-ribbon" role="note">
                <i className="fas fa-shield-alt" aria-hidden="true"></i>
                <span>Unified Gateway &bull; Students &bull; Faculty &bull; HODs &bull; TPO &bull; Alumni</span>
            </div>

            {showHelpBox && (
                <div className="soet-auth-help-box" role="region" aria-label="Account Recovery Instructions">
                    <div className="soet-auth-help-header">
                        <span><i className="fas fa-key" aria-hidden="true" style={{ marginRight: '6px' }}></i> Account Recovery Assistance</span>
                        <button 
                            type="button" 
                            className="soet-auth-help-close" 
                            onClick={() => setShowHelpBox(false)}
                            aria-label="Close recovery instructions"
                        >
                            <i className="fas fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                    <p style={{ margin: 0 }}>
                        Password reset requests are processed through authorized departmental administration. Please contact your HOD/Department Coordinator or email the SoET IT Cell at <strong>soetvikramujn@gmail.com</strong> with your registered Roll No. or Employee ID.
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
                {/* Email Field */}
                <Field 
                    id="loginEmail" 
                    label="Institutional Email Address" 
                    required
                >
                    <Input 
                        id="loginEmail"
                        type="email" 
                        value={email} 
                        onChange={e => {
                            setEmail(e.target.value);
                            if (errorMessage) setErrorMessage('');
                        }} 
                        required 
                        autoComplete="email"
                        placeholder="e.g. rollno@soet.ac.in or name@vikramuniv.ac.in"
                        disabled={isSubmitting}
                    />
                </Field>

                {/* Password Field with Show/Hide Toggle */}
                <Field 
                    id="loginPassword" 
                    label="Account Password" 
                    required
                >
                    <div style={{ position: 'relative', width: '100%' }}>
                        <Input 
                            id="loginPassword"
                            type={showPassword ? 'text' : 'password'} 
                            value={password} 
                            onChange={e => {
                                setPassword(e.target.value);
                                if (errorMessage) setErrorMessage('');
                            }} 
                            required 
                            autoComplete="current-password"
                            placeholder="Enter your account password"
                            disabled={isSubmitting}
                            style={{ paddingRight: '44px' }}
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(prev => !prev)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            aria-pressed={showPassword}
                            style={{
                                position: 'absolute',
                                right: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--text-muted, #6B6787)',
                                padding: '6px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '15px'
                            }}
                        >
                            <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} aria-hidden="true"></i>
                        </button>
                    </div>
                </Field>

                {/* Options Row */}
                <div className="soet-auth-options-row">
                    <label className="soet-auth-remember">
                        <input 
                            type="checkbox" 
                            checked={rememberMe} 
                            onChange={e => setRememberMe(e.target.checked)} 
                        />
                        <span>Remember session</span>
                    </label>
                    <button 
                        type="button" 
                        onClick={() => setShowHelpBox(prev => !prev)} 
                        className="soet-auth-forgot-btn"
                        aria-expanded={showHelpBox}
                    >
                        Forgot Password?
                    </button>
                </div>

                {/* Submit Button */}
                <Button 
                    type="submit" 
                    variant="primary"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    style={{ width: '100%' }}
                >
                    <i className="fas fa-sign-in-alt" aria-hidden="true" style={{ marginRight: '8px' }}></i>
                    Sign In to Portal
                </Button>

                {/* Registration Section Divider */}
                <div className="soet-auth-divider" role="separator">
                    <div className="soet-auth-divider-line"></div>
                    <span className="soet-auth-divider-text">New to the Portal? Register Below</span>
                    <div className="soet-auth-divider-line"></div>
                </div>

                {/* Registration Links Grid */}
                <div className="soet-auth-register-grid" role="group" aria-label="Portal registration links">
                    <Link to="/register/student" className="soet-auth-register-chip">
                        <i className="fas fa-user-graduate" aria-hidden="true"></i>
                        <span>Student Register</span>
                    </Link>
                    <Link to="/register/teacher" className="soet-auth-register-chip">
                        <i className="fas fa-chalkboard-teacher" aria-hidden="true"></i>
                        <span>Faculty Register</span>
                    </Link>
                    <Link to="/register/hod" className="soet-auth-register-chip">
                        <i className="fas fa-user-tie" aria-hidden="true"></i>
                        <span>HOD Register</span>
                    </Link>
                    <Link to="/register/alumni" className="soet-auth-register-chip">
                        <i className="fas fa-user-friends" aria-hidden="true"></i>
                        <span>Alumni Register</span>
                    </Link>
                </div>

                {/* Security Compliance Footer */}
                <div className="soet-auth-security-footer">
                    <i className="fas fa-shield-alt" aria-hidden="true"></i>
                    <span>256-Bit SSL Encrypted &bull; SoET Cyber Safety Compliant</span>
                </div>
            </form>
        </AuthLayout>
    );
}
