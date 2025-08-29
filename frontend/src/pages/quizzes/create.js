import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import apiService from '../../api/service';
import { useNavigate } from 'react-router-dom';

export default function QuizCreate() {
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

    return (
        <div className="bg-white shadow-lg rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                    Create Quiz
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Quiz Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter quiz title"
                    />
                </div>

                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                        Quiz Time (minutes) *
                    </label>
                    <input
                        type="number"
                        id="time"
                        name="time"
                        required
                        min="1"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter time in minutes"
                    />
                </div>

                {additionalData.categories && additionalData.categories.length > 0 && (
                    <div>
                        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
                            Categories * (Hold Ctrl to select multiple)
                        </label>
                        <select
                            id="category_id"
                            name="category_id"
                            multiple
                            value={formData.category_id}
                            onChange={handleCategoryChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                            required
                        >
                            {additionalData.categories.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {additionalData.difficulties && additionalData.difficulties.length > 0 && (
                    <div>
                        <label htmlFor="difficulty_id" className="block text-sm font-medium text-gray-700 mb-2">
                            Difficulty *
                        </label>
                        <select
                            id="difficulty_id"
                            name="difficulty_id"
                            value={formData.difficulty_id}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select difficulty</option>
                            {additionalData.difficulties.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {questions.length > 0 && (
                    <div>
                        <label htmlFor="question_id" className="block text-sm font-medium text-gray-700 mb-2">
                            Questions * (Hold Ctrl to select multiple)
                        </label>
                        <select
                            id="question_id"
                            name="question_id"
                            multiple
                            value={formData.question_id}
                            onChange={handleQuestionChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[200px]"
                            required
                        >
                            {questions.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.question_text}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div id="questionFeedback" className="text-sm text-orange-600"></div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="is_active"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                        Active Quiz
                    </label>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={() => navigate('/quizzes')}
                        className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading || formData.question_id.length === 0}
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating...' : 'Create Quiz'}
                    </button>
                </div>
            </form>
        </div>
    );
}