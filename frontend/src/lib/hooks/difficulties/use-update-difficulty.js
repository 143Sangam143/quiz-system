import React,{ useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../../../api/service";
import { toast } from 'react-toastify';

export function useUpdateDifficulyt(){
    const { uri } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState();
    const [formData, setFormData] = useState({
        name: '',
        is_active: true,

    });

    const fetchDifficulty = async() => {
        try{
            setLoading(true);
            const res = await apiService.getDifficultyByUri(uri);
            if (res?.success) {
                setFormData(res.data);
            } else {
                toast.warn("Difficulty not found");
                console.warn(res);
            }
        }catch (error) {
            toast.error("Error updating difficulties:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchDifficulty();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiService.updateDifficulty(uri, formData);
            if (res?.success) {
                toast.success('Difficulty updated successfully!');
                navigate('/difficulties');
            } else {
                toast.warn("Difficulty not update");
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        setFormData,
        handleSubmit
    }
}