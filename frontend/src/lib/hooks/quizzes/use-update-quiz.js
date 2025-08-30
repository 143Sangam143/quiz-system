import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import apiService from '../../../api/service';
import { useNavigate, useParams } from "react-router-dom";

export function useUpdateQuiz(){
    const { uri } = useParams();
    const navigate = useNavigate();

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
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    const fetchQuiz = async () => {
        try {
            setLoading(true);
            const res = await apiService.getQuizByUri(uri);
            if (res?.success) {
                const quiz = res.data.quiz;
                const newFormData = {
                    title: quiz.title || '',
                    time: quiz.time || '',
                    is_active: quiz.is_active ?? true,
                    category_id: quiz.categories ? quiz.categories.map(c => c.id) : [],
                    difficulty_id: quiz.difficulty_id || '',
                    question_id: quiz.questions ? quiz.questions.map(q => q.id) : []
                };
                setFormData(newFormData);
                if (res.data.categories && res.data.difficulties) {
                    setAdditionalData({
                        categories: res.data.categories,
                        difficulties: res.data.difficulties
                    });
                }
                if(res.data.question){
                    setQuestions(res.data.question);
                }
                
                
                toast.success('Quiz loaded successfully');
            } else {
                console.error('Something is not good:', res);
                toast.error(res?.message || "Quiz not found ");
            }
        } catch (error) {
            console.error("Error fetching quiz:", error);
            console.error("Error details:", error.response?.data);
            toast.error(`Error fetching quiz: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
            setInitialLoad(false);
        }
    };

    const fetchQuestions = async () => {
        if (formData.category_id.length === 0 || !formData.difficulty_id) {
            setQuestions([]);
            return;
        }
        
        try {
            setLoading(true);
            const res = await apiService.getQuestionByCategoryDifficulty({
                category_ids: formData.category_id,
                difficulty_id: formData.difficulty_id
            });

            const feedbackElement = document.getElementById('questionFeedback');
            if (feedbackElement) feedbackElement.innerText = '';

            if (res.success) {
                setQuestions(res.data);
            } else {
                setQuestions([]);
                if (feedbackElement) {
                    feedbackElement.innerText = 'No questions for the selected combination';
                }
            }
        } catch (error) {
            console.error("Error fetching filtered questions:", error);
            const feedbackElement = document.getElementById('questionFeedback');
            if (feedbackElement) {
                feedbackElement.innerText = 'Error fetching questions';
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuiz();
    }, [uri]);

    useEffect(() => {
        if (formData.category_id.length > 0 && formData.difficulty_id) {
            fetchQuestions();
        } else {
            setQuestions([]);
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
            question_id: [] // Reset questions when categories change
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
            // Prepare data to match backend validation
            const updateData = {
                title: formData.title,
                time: parseInt(formData.time),
                is_active: formData.is_active,
                category_ids: formData.category_id, // Note: backend expects category_ids
                difficulty_id: parseInt(formData.difficulty_id),
                question_ids: formData.question_id // Note: backend expects question_ids
            };

            const res = await apiService.updateQuiz(uri, updateData);
            if (res?.success) {
                toast.success('Quiz updated successfully!');
                navigate('/quizzes');
            } else {
                toast.error(res?.message || 'Failed to update quiz');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
            toast.error(errorMessage);
            console.error('Update error:', error.response?.data?.errors || error);
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        questions,
        additionalData,
        loading,
        initialLoad,
        handleCategoryChange,
        handleQuestionChange,
        handleSubmit,
        handleChange
    }
}