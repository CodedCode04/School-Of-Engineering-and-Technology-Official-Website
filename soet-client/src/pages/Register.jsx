import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import {
    AuthLayout,
    Field,
    Input,
    Select,
    Button,
    StateCard
} from '../components/shared';

export default function Register() {
    const { role } = useParams(); // student, teacher, hod, alumni
    const navigate = useNavigate();
    const { register } = useAuth();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [branch, setBranch] = useState('');
    const [branches, setBranches] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const roleDisplayName = role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Student';
    const pageTitle = `${roleDisplayName} Registration`;
    const pageSubtitle = "Create your institutional account to access the SoET portal.";

    useEffect(() => {
        document.title = `${pageTitle} - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain`;
    }, [pageTitle]);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const res = await axios.get('/api/branches');
                setBranches(res.data);
            } catch (error) {
                console.error('Failed to fetch branches');
            }
        };
        fetchBranches();
    }, []);

    // Allowed registration roles guard
    if (!['student', 'teacher', 'hod', 'alumni'].includes(role)) {
        return (
            <AuthLayout
                title="Registration"
                subtitle="Institutional Account Clearance"
            >
                <StateCard
                    variant="error"
                    title="Invalid Registration Role"
                    description="The requested registration role is invalid or not permitted. Please return to the login portal."
                    actionButton={
                        <Button to="/login" variant="primary" icon="fas fa-sign-in-alt">
                            Back to Login
                        </Button>
                    }
                />
            </AuthLayout>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsSubmitting(true);
        try {
            await register({ name, email, password, role, branch });
            toast.success('Registration successful. Pending approval.');
            navigate('/awaiting-approval');
        } catch (error) {
            const msg = error.response?.data?.error || 'Registration failed';
            setErrorMessage(msg);
            toast.error(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout
            title={pageTitle}
            subtitle={pageSubtitle}
            error={errorMessage}
        >
            <form onSubmit={handleSubmit} noValidate={false} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Field id="reg-name" label="Full Name" required>
                    <Input 
                        id="reg-name"
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        required 
                        autoComplete="name"
                        placeholder="e.g. Rahul Sharma"
                    />
                </Field>
                
                <Field id="reg-email" label="Email" required>
                    <Input 
                        id="reg-email"
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required 
                        autoComplete="email"
                        placeholder="name@institution.edu"
                    />
                </Field>
                
                <Field id="reg-password" label="Password" required>
                    <Input 
                        id="reg-password"
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        required 
                        autoComplete="new-password"
                        placeholder="Create account password"
                    />
                </Field>

                <Field id="reg-branch" label="Branch" required>
                    <Select 
                        id="reg-branch"
                        value={branch} 
                        onChange={e => setBranch(e.target.value)} 
                        required 
                        placeholder="Select Branch"
                    >
                        {branches.map(b => (
                            <option key={b._id} value={b._id}>{b.name} ({b.code})</option>
                        ))}
                    </Select>
                </Field>

                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Button 
                        type="submit" 
                        variant="primary"
                        loading={isSubmitting}
                        icon="fas fa-arrow-right"
                        iconPosition="right"
                        style={{ width: '100%' }}
                    >
                        Register
                    </Button>
                    
                    <div style={{ textAlign: 'center' }}>
                        <Link 
                            to="/login" 
                            style={{ 
                                color: 'var(--indigo-800, #2B2185)', 
                                textDecoration: 'none', 
                                fontSize: '14px', 
                                fontWeight: '600'
                            }}
                            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                        >
                            Already have an account? Login
                        </Link>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
}
