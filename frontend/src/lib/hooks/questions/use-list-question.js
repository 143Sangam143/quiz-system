import { useEffect, useState } from "react";
import apiService from "../../../api/service";
import { toast } from 'react-toastify';

export function useListQuestion(){
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState();

    const fetchQuestions = async() => {
        try{
            setLoading(true);
            const res = await apiService.getQuestions();
            setQuestions(res.data);
        }catch (error) {
            console.error("Error fetching questions:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchQuestions();
    },[]);

    const handleDelete = async (item) => {
        try{
            setLoading(true);
            const res = await apiService.deleteQuestion(item.uri);
            if(res?.success){
                toast.success('Question deleted successfully!');
                fetchQuestions();
            }else{
                console.warn('Question not delete');
            }
        }catch (error) {
            console.error("Error deleting question:", error);
        } finally {
            setLoading(false);
        }
    };
    
    return {
        questions,
        loading,
        setQuestions,
        handleDelete
    }
}