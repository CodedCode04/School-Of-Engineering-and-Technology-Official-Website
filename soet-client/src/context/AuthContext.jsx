import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    const api = axios.create({
        baseURL: '/api',
        withCredentials: true
    });

    // Add interceptor to include token in header if present
    api.interceptors.request.use(config => {
        const storedToken = token || localStorage.getItem('token');
        if (storedToken) {
            config.headers.Authorization = `Bearer ${storedToken}`;
        }
        return config;
    });

    api.interceptors.response.use(
        response => response,
        error => {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
            }
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        const loadUser = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
                try {
                    const res = await api.get('/auth/me');
                    setUser(res.data.user);
                } catch (error) {
                    console.error('Error loading user', error);
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        const newToken = res.data.token;
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(res.data.user);
        return res.data.user;
    };

    const register = async (userData) => {
        const res = await api.post('/auth/register', userData);
        return res.data;
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error', error);
        }
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, register, api }}>
            {children}
        </AuthContext.Provider>
    );
};
