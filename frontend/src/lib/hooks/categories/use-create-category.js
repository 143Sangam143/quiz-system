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
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiService.createCategory(formData);
            if(res?.success){
                navigate('/categories');
                toast.success('Category created successfully!');
            }else{
                toast.warn('Category not created');
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };


    return {
        formData,
        setFormData,
        loading,
        handleSubmit
    }
}