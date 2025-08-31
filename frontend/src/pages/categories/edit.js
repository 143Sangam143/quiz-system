import CategoryForm from "../../components/CategoryForm";
import { useUpdateCategory } from "../../lib/hooks/categories/use-update-category";
import { useGlobalHook } from "../../lib/hooks/use-global-hook";

export default function CategoryEdit(){

    const {loading, formData, setFormData, handleSubmit} = useUpdateCategory();
    const {handleChange} = useGlobalHook({ setData: setFormData });

    return (
        <div className="shadow-lg">
            <CategoryForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
            />
        </div>
    );
}