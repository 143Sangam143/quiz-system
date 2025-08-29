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
        category_id : [],
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
            if(res.success){
                setQuestions(res.data);
            }
            else{
                setQuestions([]);
                document.getElementById('questionFeedback').innerText = 'No questions for the combination of cateogry and difficultry';
            }
        }catch (error) {
            console.error("Error fetching filtered questions:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if(formData.category_id.length > 0 && formData.difficulty_id){
            fetchQuestions();
        } else {
            setQuestions([]);
        }
    }, [formData.category_id, formData.difficulty_id]);


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
            const res = await apiService.createQuiz(formData);
            if(res?.success){
                navigate('/quizzes');
                toast.success('Quiz created successfully!');
            }else{
                console.warn('Quiz not created');
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
                    {'Create Quiz'}
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Quize Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter quize title"
                    />
                </div>
                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                        Quize Time *
                    </label>
                    <input
                        type="number"
                        id="time"
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Time is according to minutes"
                    />
                </div>
                {additionalData.categories &&
                    <div className="flex items-center">
                        <label className="ml-2 block text-sm text-gray-700">
                            Categories
                        </label>
                        <select
                            name="category_id"
                            multiple
                            value={formData.category_id || ''}
                            onChange={(e) => {
                                const selected = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                                setFormData(prev => ({ ...prev, category_id: selected }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        >
                            <option value="" disabled>Select category</option>
                            {additionalData.categories.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                }

                {additionalData.difficulties &&
                    <div className="flex items-center">
                        <label className="ml-2 block text-sm text-gray-700">
                            Difficulties
                        </label>
                        <select
                            name="difficulty_id"
                            value={formData.difficulty_id || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        >
                            <option value="" disabled>Select difficulty</option>
                            {additionalData.difficulties.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                }

                {questions.length > 0 &&
                    <div className="flex items-center">
                        <label className="ml-2 block text-sm text-gray-700">
                            Questions
                        </label>
                        <select
                        name="question_id"
                        multiple
                        value={formData.question_id}
                        onChange={(e) => {
                            const selected = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                            setFormData(prev => ({ ...prev, question_id: selected }));
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        required
                        >
                            {questions.map(item => (
                                <option key={item.id} value={item.id}>{item.question_text}</option>
                            ))}
                        </select>
                    </div>
                }
                <span id="questionFeedback"></span>

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
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : 'Create Category'}
                    </button>
                </div>
            </form>
        </div>
    );
}