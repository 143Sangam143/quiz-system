import { useEffect, useState } from "react";
import apiService from "../../../api/service";
import { toast } from 'react-toastify';

export function useListDifficulty(){
    const [difficulties, setDifficulties] = useState([]);
    const [loading, setLoading] = useState();
    const fetchDifficulties = async() => {
        try{
            setLoading(true);
            const res = await apiService.getDifficulties();
            setDifficulties(res.data);
        }catch (error) {
            console.error("Error fetching difficultires:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchDifficulties();
    },[]);

    const handleDelete = async (item) => {
        try{
            setLoading(true);
            const res = await apiService.deleteDifficulty(item.uri);
            if(res?.success){
                toast.success('Difficulty deleted successfully!');
                fetchDifficulties();
            }else{
                console.warn('Difficulty not delete');
            }
        }catch (error) {
            console.error("Error deleting difficulties:", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        difficulties,
        loading,
        handleDelete
    }
}