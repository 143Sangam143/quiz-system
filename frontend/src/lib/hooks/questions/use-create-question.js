import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import apiService from '../../../api/service';
import { useNavigate } from 'react-router-dom';

export function useCreateQuestion(){
     const [formData, setFormData] = useState({
        question_text: '',
        answer_explanation : '',
        is_active: true,
        answer_text: [
            { text: '', is_correct: false },
            { text: '', is_correct: false },
            { text: '', is_correct: false },
            { text: '', is_correct: false }
        ]
    });
    const [additionalData, setAdditionalData] = useState({
        categories: [],
        difficulties: []
    });
    const [loading, setLoading] = useState(false);

    const fetchAdditionalData = async() => {
        try{
            setLoading(true);
            const res = await apiService.getAdditionalData();
            setAdditionalData(res.data);
        }catch (error) {
            console.error("Error fetching related data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAdditionalData();
    },[]);

    const navigate = useNavigate();

    const handleAnswerTextChange = (index, text) => {
        const newOptions = [...formData.answer_text];
        newOptions[index] = { 
            ...newOptions[index], 
            text: text
        };
        setFormData(prev => ({ ...prev, answer_text: newOptions }));
    };

    const handleCorrectChange = (index) => {
        const newOptions = formData.answer_text.map((option, i) => ({
            text: option.text || '',
            is_correct: i === index
        }));
        setFormData(prev => ({ ...prev, answer_text: newOptions }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiService.createQuestion(formData);
            if(res?.success){
                navigate('/questions');
                toast.success('Question created successfully!');
            }else{
                console.warn('Question not created');
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
        setFormData,
        additionalData,
        loading,
        handleAnswerTextChange,
        handleCorrectChange,
        handleSubmit
    }
}