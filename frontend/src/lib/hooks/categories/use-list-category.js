import { useEffect, useState } from "react";
import apiService from "../../../api/service";
import { toast } from 'react-toastify';

export function useListCategory(){
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState();

    const fetchCategories = async() => {
        try{
            setLoading(true);
            const res = await apiService.getCategories();
            setCategories(res.data);
        }catch (error) {
            toast.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchCategories();
    },[]);

    const handleDelete = async (item) => {
        try{
            setLoading(true);
            const res = await apiService.deleteCategory(item.uri);
            if(res?.success){
                toast.success('Category deleted successfully!');
                fetchCategories();
            }else{
                toast.warn('Category not delete');
            }
        }catch (error) {
            toast.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        categories,
        setCategories,
        loading,
        handleDelete
    }
}