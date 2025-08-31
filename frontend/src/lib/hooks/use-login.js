import React, {useState} from 'react';
import { useAuth } from '../../context/AuthContext';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 

export function useLogin(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? true : false) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login(formData);
            if (response.success) {
                toast.success(response.message);
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.message && Array.isArray(error.message)) {
                error.message.forEach(msg => toast.error(msg));
            } else {
                toast.error(error.message || 'Login failed');
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        handleChange,
        handleSubmit
    }
}