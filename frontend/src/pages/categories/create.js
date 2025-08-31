import CategoryForm from '../../components/CategoryForm';
import { useCreateCategory } from '../../lib/hooks/categories/use-create-category';
import { useGlobalHook } from '../../lib/hooks/use-global-hook';

export default function CategoryCreate() {
    
    const {formData, loading, setFormData, handleSubmit} = useCreateCategory();
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