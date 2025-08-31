import { toast } from "react-toastify";
import apiService from "../../api/service";

export function useGlobalHook({ setData, setLists }){
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleToggleActive = async (itemId, fieldName, value, model) => {
        try {
            setLists(prev => 
                prev.map(item => 
                    item.id === itemId 
                    ? { ...item, [fieldName]: value }
                    : item
                )
            );
            const data = { itemId, fieldName, value, model };
            const res = await apiService.globalToggleStatus(data);

            if (!res.success) {
                toast.error(res.message);
            } else {
                toast.success(res.message);
            }

        } catch (error) {
            console.error('Error updating category:', error);

            // Revert UI change
            setLists(prev => 
                prev.map(item => 
                    item.id === itemId 
                    ? { ...item, [fieldName]: !value }
                    : item
                )
            );

            toast.error(`Failed to update ${fieldName} status`);
        }
    };


    return {
        handleChange,
        handleToggleActive
    }
}