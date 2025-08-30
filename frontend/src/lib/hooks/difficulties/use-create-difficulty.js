import React, { useState } from 'react';
import { toast } from 'react-toastify';
import apiService from '../../../api/service';
import { useNavigate } from 'react-router-dom';

export function useCreateDifficulty(){
    const [formData, setFormData] = useState({
        name: '',
        is_active: true
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiService.createDifficulty(formData);
            if(res?.success){
                navigate('/difficulties');
                toast.success('Difficulty created successfully!');
            }else{
                console.warn('Difficulty not created');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
            toast.error(errorMessage);
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