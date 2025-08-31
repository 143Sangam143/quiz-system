import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../../../api/service";
import { toast } from 'react-toastify';

export function useUpdateQuestion(){
    const { uri } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        question_text: '',
        answer_explanation: '',
        is_active: true,
        category_id: '',
        difficulty_id: '',
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

    const fetchQuestion = async () => {
        try {
            setLoading(true);
            const res = await apiService.getQuestionByUri(uri);
            if (res?.success) {
                // Transform the response data to match our form structure
                const questionData = {
                    question_text: res.data.question.question_text || '',
                    answer_explanation: res.data.question.answer_explanation || '',
                    is_active: res.data.question.is_active || false,
                    category_id: res.data.question.category_id || '',
                    difficulty_id: res.data.question.difficulty_id || '',
                    answer_text: res.data.answers || [
                        { text: '', is_correct: false },
                        { text: '', is_correct: false },
                        { text: '', is_correct: false },
                        { text: '', is_correct: false }
                    ]
                };
                setFormData(questionData);
            } else {
                console.warn("Question not found");
                toast.error("Question not found");
                navigate('/questions');
            }
        } catch (error) {
            console.error("Error fetching question:", error);
            toast.error("Error fetching question");
            navigate('/questions');
        } finally {
            setLoading(false);
        }
    }

    const fetchAdditionalData = async () => {
        try {
            const res = await apiService.getAdditionalData();
            setAdditionalData(res.data);
        } catch (error) {
            console.error("Error fetching additional data:", error);
        }
    }

    useEffect(() => {
        fetchQuestion();
        fetchAdditionalData();
    }, [uri]);

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
        
        // Validate that at least one answer is marked as correct
        const hasCorrectAnswer = formData.answer_text.some(answer => answer.is_correct);
        if (!hasCorrectAnswer) {
            toast.error('Please select the correct answer');
            setLoading(false);
            return;
        }

        // Validate that all answers have text
        const hasEmptyAnswers = formData.answer_text.some(answer => !answer.text.trim());
        if (hasEmptyAnswers) {
            toast.error('Please fill in all answer options');
            setLoading(false);
            return;
        }

        // Prepare the data to send - ensure all boolean values are actual booleans
        const dataToSend = {
            ...formData,
            is_active: Boolean(formData.is_active),
            answer_text: formData.answer_text.map(answer => ({
                text: answer.text,
                is_correct: Boolean(answer.is_correct)
            }))
        };

        try {
            console.log('Sending update data:', dataToSend); // Debug log
            const res = await apiService.updateQuestion(uri, dataToSend);
            if (res?.success) {
                toast.success('Question updated successfully!');
                navigate('/questions');
            } else {
                console.warn("Question not updated", res);
                toast.error('Failed to update question');
            }
        } catch (error) {
            console.error('Update error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        setFormData,
        formData,
        additionalData,
        handleSubmit,
        handleCorrectChange,
        handleAnswerTextChange
    }
}