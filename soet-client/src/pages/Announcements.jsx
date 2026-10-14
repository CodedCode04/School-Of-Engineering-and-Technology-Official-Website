import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Turnstile } from '@marsidev/react-turnstile';
import PageBanner from '../components/PageBanner';
import Card from '../components/Card';
import Button from '../components/Button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BREADCRUMBS = [
    { label: 'Home', to: '/' },
    { label: 'Announcements', to: null }
];

const CATEGORIES = ['all', 'academic', 'events', 'admissions', 'results', 'placement'];

export default function Announcements() {
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState('');
    const turnstileRef = useRef(null);

    const [announcements, setAnnouncements] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const fetchAnnouncements = async () => {
        setIsFetching(true);
        setFetchError(null);
        try {
            const res = await axios.get(`${API_URL}/api/announcements`);
            setAnnouncements(res.data?.data || []);
        } catch (error) {
            console.error('Failed to load announcements', error);
            setFetchError('Something went wrong. Please try again.');
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        document.title = "Announcements - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";

        const params = new URLSearchParams(location.search);
        const previewParam = params.get('preview');

        if (import.meta.env.DEV && previewParam) {
            if (previewParam === 'loading') {
                setIsFetching(true);
                setFetchError(null);
                setAnnouncements([]);
            } else if (previewParam === 'error') {
                setIsFetching(false);
                setFetchError('Something went wrong. Please try again.');
                setAnnouncements([]);
            } else if (previewParam === 'empty') {
                setIsFetching(false);
                setFetchError(null);
                setAnnouncements([]);
            } else if (previewParam === 'data') {
                setIsFetching(true);
                setFetchError(null);
                import('./announcementsPreview.dev.js')
                    .then(mod => {
                        setAnnouncements(mod.SAMPLE_ANNOUNCEMENTS || []);
                        setIsFetching(false);
                    })
                    .catch(err => {
                        console.error('Failed to load sample preview data', err);
                        setFetchError('Something went wrong. Please try again.');
                        setIsFetching(false);
                    });
            } else {
                fetchAnnouncements();
            }
        } else {
            fetchAnnouncements();
        }
    }, [location.search]);

    const submitWithRetry = async (payload, retryCount = 1) => {
        try {
            return await axios.post(`${API_URL}/api/newsletter`, payload, {
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

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        
        if (!turnstileToken) {
            setStatus({ type: 'error', message: 'Please complete the CAPTCHA.' });
            return;
        }

        setIsLoading(true);
        setStatus({ type: 'info', message: 'Subscribing...' });

        try {
            await submitWithRetry({ email, turnstileToken });
            setStatus({ type: 'success', message: 'Successfully subscribed to the newsletter!' });
            setEmail('');
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.error || 'Failed to subscribe. Please try again.' });
        } finally {
            setIsLoading(false);
            setTurnstileToken('');
            if (turnstileRef.current) {
                turnstileRef.current.reset();
            }
        }
    };

    const parseDateParts = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return null;
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
        const year = date.getFullYear().toString();
        return { day, month, year };
    };

    const getCategoryCount = (cat) => {
        if (cat === 'all') return announcements.length;
        return announcements.filter(a => a.category && a.category.toLowerCase() === cat.toLowerCase()).length;
    };

    const filteredAnnouncements = announcements
        .filter(a => filter === 'all' || (a.category && a.category.toLowerCase() === filter.toLowerCase()))
        .filter(a => search === '' || (a.title && a.title.toLowerCase().includes(search.toLowerCase())) || (a.body && a.body.toLowerCase().includes(search.toLowerCase())))
        .sort((a, b) => (b.isImportant ? 1 : 0) - (a.isImportant ? 1 : 0));

    return (
        <>
            {/* Page Banner */}
            <PageBanner
                title="Announcements"
                subtitle="Stay updated with the latest news and important announcements from SoET"
                breadcrumbs={BREADCRUMBS}
            />

            {/* Main Announcements Section */}
            <section 
                className="announcements-page-section reveal-fade-up" 
                id="announcements-list-section" 
                aria-labelledby="heading-latest-announcements"
            >
                <div className="container">
                    {/* Header Row */}
                    <div className="announcements-header-row">
                        <div className="announcements-header-left">
                            <div className="announcements-header-icon-circle" aria-hidden="true">
                                <i className="fas fa-bullhorn"></i>
                            </div>
                            <h2 id="heading-latest-announcements" className="announcements-header-title">
                                Latest Announcements
                            </h2>
                        </div>
                        {!isFetching && !fetchError && announcements.length > 0 && (
                            <div className="announcements-count-badge" aria-live="polite">
                                Showing {filteredAnnouncements.length} announcement{filteredAnnouncements.length === 1 ? '' : 's'}
                            </div>
                        )}
                    </div>

                    {/* Filter & Search Toolbar Card */}
                    <Card padding="compact" className="announcements-toolbar-card">
                        <div className="announcements-toolbar-inner">
                            <div className="announcements-toolbar-chips" role="group" aria-label="Filter announcements by category">
                                {CATEGORIES.map(cat => {
                                    const isActive = filter === cat;
                                    const count = announcements.length > 0 ? getCategoryCount(cat) : null;
                                    return (
                                        <button 
                                            key={cat}
                                            type="button"
                                            className={`announcements-chip ${isActive ? 'active' : ''}`} 
                                            onClick={() => setFilter(cat)}
                                            aria-pressed={isActive}
                                        >
                                            <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                                            {count !== null && count > 0 && (
                                                <span className="announcements-chip-count">({count})</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="announcements-search-box">
                                <label htmlFor="announcements-search" className="sr-only">
                                    Search announcements
                                </label>
                                <i className="fas fa-search announcements-search-icon" aria-hidden="true"></i>
                                <input 
                                    id="announcements-search"
                                    type="text" 
                                    className="announcements-search-input"
                                    placeholder="Search announcements..." 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                {search && (
                                    <button
                                        type="button"
                                        className="announcements-search-clear"
                                        onClick={() => setSearch('')}
                                        aria-label="Clear search"
                                    >
                                        <i className="fas fa-times" aria-hidden="true"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Content Area: Four States */}
                    {isFetching ? (
                        /* State 1: Loading Skeleton */
                        <div className="announcements-loading-list" aria-label="Loading announcements">
                            {[1, 2, 3].map(idx => (
                                <Card key={idx} className="announcement-card-skeleton">
                                    <div className="skeleton-date-tile" aria-hidden="true" />
                                    <div className="skeleton-content-col" aria-hidden="true">
                                        <div className="skeleton-badge" />
                                        <div className="skeleton-line skeleton-title" />
                                        <div className="skeleton-line skeleton-desc" />
                                        <div className="skeleton-line skeleton-desc-short" />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : fetchError ? (
                        /* State 2: Error Card */
                        <Card className="announcements-state-card">
                            <div className="announcements-state-icon-circle maroon-circle" aria-hidden="true">
                                <i className="fas fa-exclamation-circle"></i>
                            </div>
                            <h3 className="announcements-state-title">Couldn't load announcements</h3>
                            <p className="announcements-state-desc">Something went wrong. Please try again.</p>
                            <Button
                                variant="primary"
                                onClick={fetchAnnouncements}
                                className="announcements-state-btn"
                            >
                                Try again
                            </Button>
                        </Card>
                    ) : announcements.length === 0 ? (
                        /* State 3: Empty State (No announcements at all) */
                        <Card className="announcements-state-card">
                            <div className="announcements-state-icon-circle indigo-circle" aria-hidden="true">
                                <i className="fas fa-bullhorn"></i>
                            </div>
                            <h3 className="announcements-state-title">No announcements yet</h3>
                            <p className="announcements-state-desc">New announcements will appear here.</p>
                        </Card>
                    ) : filteredAnnouncements.length === 0 ? (
                        /* State 4: Empty Filtered State (No matches for criteria) */
                        <Card className="announcements-state-card">
                            <div className="announcements-state-icon-circle indigo-circle" aria-hidden="true">
                                <i className="fas fa-search"></i>
                            </div>
                            <h3 className="announcements-state-title">No announcements found matching your criteria.</h3>
                            <p className="announcements-state-desc">Try clearing your search query or selecting another category.</p>
                            <Button
                                variant="secondary"
                                onClick={() => { setFilter('all'); setSearch(''); }}
                                className="announcements-state-btn"
                            >
                                Clear filters
                            </Button>
                        </Card>
                    ) : (
                        /* Populated Announcements List */
                        <div className="announcements-list">
                            {filteredAnnouncements.map(item => {
                                const dateParts = parseDateParts(item.publishAt);
                                return (
                                    <Card 
                                        key={item._id} 
                                        className={`announcement-card-item ${item.isImportant ? 'announcement-card-pinned' : ''}`}
                                    >
                                        {/* Date Tile (desktop) */}
                                        {dateParts && (
                                            <div className="announcement-date-tile" aria-hidden="true">
                                                <span className="announcement-date-day">{dateParts.day}</span>
                                                <span className="announcement-date-month">{dateParts.month}</span>
                                                <span className="announcement-date-year">{dateParts.year}</span>
                                            </div>
                                        )}

                                        {/* Content Column */}
                                        <div className="announcement-content-wrap">
                                            {/* Badges Row */}
                                            <div className="announcement-badges-row">
                                                {dateParts && (
                                                    <div className="announcement-mobile-date-chip" aria-hidden="true">
                                                        <i className="far fa-calendar-alt"></i>
                                                        <span>{dateParts.day} {dateParts.month} {dateParts.year}</span>
                                                    </div>
                                                )}
                                                {item.category && (
                                                    <span className="announcement-badge-category">
                                                        {item.category}
                                                    </span>
                                                )}
                                                {item.isImportant && (
                                                    <span className="announcement-badge-important">
                                                        <i className="fas fa-thumbtack" aria-hidden="true"></i>
                                                        IMPORTANT
                                                    </span>
                                                )}
                                            </div>

                                            {/* Title */}
                                            <h3 className="announcement-item-title">
                                                {item.title}
                                            </h3>

                                            {/* Description Body */}
                                            <div 
                                                className="announcement-item-desc" 
                                                dangerouslySetInnerHTML={{ __html: item.body }} 
                                            />

                                            {item.coverImage && (
                                                <img 
                                                    src={`${API_URL}${item.coverImage}`} 
                                                    alt={item.title} 
                                                    style={{ maxWidth: '100%', height: '180px', objectFit: 'cover', marginTop: '12px', borderRadius: '8px' }} 
                                                />
                                            )}
                                        </div>

                                        {/* Actions Column (Attachments) */}
                                        {item.attachments && item.attachments.length > 0 && (
                                            <div className="announcement-actions-wrap">
                                                {item.attachments.map((att, idx) => {
                                                    const fileHref = att.url?.startsWith('http') || att.url === '#' ? att.url : `${API_URL}${att.url}`;
                                                    return (
                                                        <Button
                                                            key={idx}
                                                            href={fileHref}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            variant="secondary"
                                                            size="small"
                                                            icon="fas fa-download"
                                                            iconPosition="left"
                                                            className="announcement-action-btn"
                                                        >
                                                            {att.name || 'Download'}
                                                        </Button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Subscription */}
            <section 
                className="newsletter-section pattern-dots-dark reveal-fade-up" 
                aria-labelledby="newsletter-heading"
            >
                <div className="container">
                    <Card className="newsletter-card">
                        <div className="newsletter-content">
                            <div className="newsletter-icon" aria-hidden="true">
                                <i className="fas fa-bell"></i>
                            </div>
                            <div className="newsletter-text">
                                <h2 id="newsletter-heading" className="newsletter-title">Stay Updated</h2>
                                <p className="newsletter-subtitle">
                                    Subscribe to receive the latest announcements and updates directly in your inbox
                                </p>
                            </div>
                        </div>
                        <div className="newsletter-form">
                            <form onSubmit={handleNewsletterSubmit}>
                                {status.message && (
                                    <div 
                                        className={`newsletter-alert newsletter-alert-${status.type}`}
                                        role="status"
                                        aria-live="polite"
                                    >
                                        <i className={`fas ${status.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`} aria-hidden="true"></i>
                                        <span>{status.message}</span>
                                    </div>
                                )}
                                <div className="newsletter-input-group">
                                    <label htmlFor="newsletter-email" className="sr-only">
                                        Email address
                                    </label>
                                    <input 
                                        id="newsletter-email"
                                        name="email"
                                        type="email" 
                                        placeholder="Enter your email address" 
                                        required 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="newsletter-input"
                                    />
                                    <Button 
                                        type="submit" 
                                        variant="primary" 
                                        icon="fas fa-paper-plane"
                                        iconPosition="left"
                                        disabled={isLoading || !turnstileToken}
                                        className="newsletter-submit-btn"
                                    >
                                        {isLoading ? 'Subscribing...' : 'Subscribe'}
                                    </Button>
                                </div>
                                <div className="newsletter-turnstile-container">
                                    <Turnstile 
                                        ref={turnstileRef}
                                        siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'} 
                                        onSuccess={(token) => setTurnstileToken(token)}
                                        onError={() => setStatus({ type: 'error', message: 'CAPTCHA error.' })}
                                        onExpire={() => {
                                            setTurnstileToken('');
                                            setStatus({ type: 'error', message: 'CAPTCHA expired.' });
                                        }}
                                    />
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            </section>
        </>
    );
}
