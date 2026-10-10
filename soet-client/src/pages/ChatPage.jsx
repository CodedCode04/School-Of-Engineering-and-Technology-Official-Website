import React from 'react';
import Layout from '../components/Layout';
import ChatLayout from '../components/ChatLayout';

export default function ChatPage() {
    return (
        <Layout>
            <div style={{ maxWidth: '1000px', margin: '40px auto' }}>
                <h2 style={{ marginBottom: '20px' }}>Communications</h2>
                <ChatLayout />
            </div>
        </Layout>
    );
}
