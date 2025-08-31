import DiffficultyForm from "../../components/DifficultyForm";
import { useUpdateDifficulyt } from "../../lib/hooks/difficulties/use-update-difficulty";
import { useGlobalHook } from "../../lib/hooks/use-global-hook";

export default function DifficultyEdit(){
    
    const {formData, loading, setFormData, handleSubmit} = useUpdateDifficulyt();
    const {handleChange} = useGlobalHook({ setData: setFormData });

    return (
        <div className="shadow-lg">
            <DiffficultyForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
            />
        </div>
    );
}