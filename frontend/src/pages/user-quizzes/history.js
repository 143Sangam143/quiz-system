import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import apiService from '../../api/service';
import { useNavigate, useParams } from "react-router-dom";

export default function History() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [results, setResults] = useState([]);

    const [loading, setLoading] = useState(false);

    const fetchResult = async () => {
        try {
            setLoading(true);
            const res = await apiService.getUserHistory(id);
            if (res?.success) {
                setResults(res.attempts);
                toast.success('History loaded successfully');
            } else {
                console.error('Something is not good:', res);
                toast.error(res?.message || "Result not found ");
            }
        } catch (error) {
            console.error("Error fetching result:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResult();
    }, [id]);

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                    {'Result History'}
                </h3>
            </div>
            {loading ? (
                <p className="text-gray-600">Loading data...</p>
            ) 
            : results.length === 0 ? (
                <p className="text-gray-600">No data found.</p>
            ) 
            : 
            (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Started At</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed At</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {results.map((attempt) => (
                            <tr key={attempt.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{attempt.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{attempt.quiz?.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{attempt.score ?? 0}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {attempt.started_at ? new Date(attempt.started_at).toISOString().slice(0, 19).replace("T", " ") : '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {attempt.finished_at ? new Date(attempt.finished_at).toISOString().slice(0, 19).replace("T", " ") : '-'}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}