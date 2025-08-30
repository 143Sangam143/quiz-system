import { useEffect, useState } from "react";
import apiService from "../../../api/service";
import { toast } from 'react-toastify';

export function useListQuiz(){
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

    const handleDelete = async (item) => {
        try{
            setLoading(true);
            const res = await apiService.deleteQuiz(item.uri);
            if(res?.success){
                toast.success('Quize deleted successfully!');
                fetchQuizzes();
            }else{
                console.warn('Quize not delete');
            }
        }catch (error) {
            console.error("Error deleting quiz", error);
        } finally {
            setLoading(false);
        }
    };
    
    return {
        quizzes,
        loading,
        handleDelete
    }
}