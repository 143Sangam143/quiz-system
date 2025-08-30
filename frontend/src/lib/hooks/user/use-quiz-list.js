import { useEffect, useState } from "react";
import apiService from "../../../api/service";
import { toast } from 'react-toastify';

export function useQuizList(){
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState();

    const fetchQuizzes = async() => {
        try{
            setLoading(true);
            const res = await apiService.getQuizzes();
            setQuizzes(res.data);
        }catch (error) {
            console.error("Error fetching quizzes:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchQuizzes();
    },[]);

    return {
        quizzes,
        loading
    }
}