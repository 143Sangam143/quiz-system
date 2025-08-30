import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import apiService from '../../../api/service';
import { useNavigate, useParams } from "react-router-dom";

export function usePlayerHistory(){
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

    return {
        results,
        loading
    }
}