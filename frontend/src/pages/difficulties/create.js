import DiffficultyForm from "../../components/DifficultyForm";
import { useCreateDifficulty } from "../../lib/hooks/difficulties/use-create-difficulty";
import { useGlobalHook } from "../../lib/hooks/use-global-hook";

export default function DifficultyCreate() {
    
    const {formData, loading, setFormData, handleSubmit} = useCreateDifficulty();
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