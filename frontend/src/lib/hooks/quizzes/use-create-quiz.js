import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import apiService from '../../../api/service';
import { useNavigate } from 'react-router-dom';

export function useCreateQuiz(){
    const [formData, setFormData] = useState({
        title: '',
        time: '',
        is_active: true,
        question_id: [],
        category_id: [],
        difficulty_id: ''
    });
    const [questions, setQuestions] = useState([]);
    const [additionalData, setAdditionalData] = useState({
        categories: [],
        difficulties: []
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const fetchAdditionalData = async() => {
        try{
            setLoading(true);
            const res = await apiService.getAdditionalQuizData();
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

    const fetchQuestions = async() => {
        try{
            setLoading(true);
            const res = await apiService.getQuestionByCategoryDifficulty({
                category_ids: formData.category_id,
                difficulty_id: formData.difficulty_id
            });
            
            // Clear previous feedback
            const feedbackElement = document.getElementById('questionFeedback');
            if(feedbackElement) {
                feedbackElement.innerText = '';
            }

            if(res.success){
                setQuestions(res.data);
                // Reset selected questions when new questions are fetched
                setFormData(prev => ({ ...prev, question_id: [] }));
            } else {
                setQuestions([]);
                if(feedbackElement) {
                    feedbackElement.innerText = 'No questions for the combination of category and difficulty';
                }
            }
        }catch (error) {
            console.error("Error fetching filtered questions:", error);
            const feedbackElement = document.getElementById('questionFeedback');
            if(feedbackElement) {
                feedbackElement.innerText = 'Error fetching questions';
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(formData.category_id.length > 0 && formData.difficulty_id){
            fetchQuestions();
        } else {
            setQuestions([]);
            // Clear selected questions when categories or difficulty changes
            setFormData(prev => ({ ...prev, question_id: [] }));
        }
    }, [formData.category_id, formData.difficulty_id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCategoryChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setFormData(prev => ({ 
            ...prev, 
            category_id: selected,
            question_id: [] // Reset selected questions when categories change
        }));
    };

    const handleQuestionChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setFormData(prev => ({ ...prev, question_id: selected }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.title.trim()) {
            toast.error('Quiz title is required');
            return;
        }
        if (!formData.time || formData.time <= 0) {
            toast.error('Valid quiz time is required');
            return;
        }
        if (formData.category_id.length === 0) {
            toast.error('At least one category must be selected');
            return;
        }
        if (!formData.difficulty_id) {
            toast.error('Difficulty must be selected');
            return;
        }
        if (formData.question_id.length === 0) {
            toast.error('At least one question must be selected');
            return;
        }

        setLoading(true);
        try {
            const res = await apiService.createQuiz(formData);
            if(res?.success){
                navigate('/quizzes');
                toast.success('Quiz created successfully!');
            } else {
                toast.error(res?.message || 'Failed to create quiz');
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
        questions,
        additionalData,
        loading,
        handleCategoryChange,
        handleQuestionChange,
        handleChange,
        handleSubmit
    }
}