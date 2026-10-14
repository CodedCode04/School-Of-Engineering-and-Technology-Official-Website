import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export default function Layout({ children }) {
    return (
        <div className="app-container">
            <ScrollToTop />
            <Header />
            <main id="main-content">
                {children || <Outlet />}
            </main>
            <Footer />
        </div>
    );
}
