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
            } else {
                toast.error("Category not found");
                navigate('/categories');
            }
        }catch (error) {
            toast.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchCategory();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiService.updateCategory(uri, formData);
            if (res?.success) {
                toast.success('Category updated successfully!');
                navigate('/categories');
            } else {
                toast.warn("Category not found");
            }
        } catch (error) {
            toast.error(error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return {
        uri,
        loading,
        formData,
        setFormData,
        handleSubmit
    }
}