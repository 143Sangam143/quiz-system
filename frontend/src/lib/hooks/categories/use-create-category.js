import { useEffect, useState } from "react";
import apiService from "../../../api/service";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function useCreateCategory(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        is_active: true
    });
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
            const res = await apiService.createCategory(formData);
            if(res?.success){
                navigate('/categories');
                toast.success('Category created successfully!');
            }else{
                console.warn('Category not created');
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