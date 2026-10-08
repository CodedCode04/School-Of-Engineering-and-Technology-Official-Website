import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    useEffect(() => {
        document.title = "404 Not Found - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
    }, []);

    return (
        <section className="page-header" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <div className="container">
                <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 500 }}>Page Not Found</h2>
                <p style={{ marginBottom: '2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fas fa-home"></i> Back to Home
                </Link>
            </div>
        </section>
    );
}
