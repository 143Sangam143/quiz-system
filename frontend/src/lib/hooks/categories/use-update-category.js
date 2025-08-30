import React,{ useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../../../api/service";
import { toast } from 'react-toastify';

export function useUpdateCategory(){
    const { uri } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState();
    const [formData, setFormData] = useState({
        name: '',
        is_active: true,

    });

    const fetchCategory = async() => {
        try{
            setLoading(true);
            const res = await apiService.getCategoryByUri(uri);
            if (res?.success) {
                setFormData(res.data);
                toast.success('Category updated successfully!');
            } else {
                console.warn("Category not found");
                console.warn(res);
            }
        }catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchCategory();
    },[]);

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
            const res = await apiService.updateCategory(uri, formData);
            if (res?.success) {
                toast.success('Category updated successfully!');
                navigate('/categories');
            } else {
                console.warn("Category not found");
                console.warn(res);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        uri,
        loading,
        formData,
        handleChange,
        handleSubmit
    }
}