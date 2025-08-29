import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../api/service';

const AuthContext  = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        const data = await apiService.login(credentials);
        setUser(data.user);
        return data;
    };

    const register = async (userData) => {
        const data = await apiService.register(userData);
        setUser(data.user);
        return data;
    };

    const logout = async () => {
        await apiService.logout();
        setUser(null);
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};