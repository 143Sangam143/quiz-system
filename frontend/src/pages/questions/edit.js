import { useUpdateQuestion } from "../../lib/hooks/questions/use-update-question";


export default function QuestionEdit() {
    
    const { loading, formData, additionalData, handleChange, handleSubmit, handleCorrectChange, handleAnswerTextChange } = useUpdateQuestion();

    if (loading && !formData.question_text) {
        return (
            <div className="bg-white shadow-lg rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Loading...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-lg rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                    Edit Question
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                    <label htmlFor="question_text" className="block text-sm font-medium text-gray-700 mb-2">
                        Question Text *
                    </label>
                    <input
                        type="text"
                        id="question_text"
                        name="question_text"
                        required
                        value={formData.question_text}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter question text"
                    />
                </div>

                {additionalData.categories && additionalData.categories.length > 0 && (
                    <div>
                        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
                            Categories *
                        </label>
                        <select
                            id="category_id"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        >
                            <option value="" disabled>Select category</option>
                            {additionalData.categories.map(item => (
                                <option key={item.id} value={item.id} >{item.name}</option>
                            ))}
                        </select>
                    </div>
                )}

                {additionalData.difficulties && additionalData.difficulties.length > 0 && (
                    <div>
                        <label htmlFor="difficulty_id" className="block text-sm font-medium text-gray-700 mb-2">
                            Difficulties *
                        </label>
                        <select
                            id="difficulty_id"
                            name="difficulty_id"
                            value={formData.difficulty_id}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        >
                            <option value="" disabled>Select difficulty</option>
                            {additionalData.difficulties.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Answer Options * (Select the correct answer)
                    </label>
                    <div className="space-y-2">
                        {[0,1,2,3].map(i => (
                            <div key={i} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={formData.answer_text[i]?.text || ''}
                                    onChange={e => handleAnswerTextChange(i, e.target.value)}
                                    placeholder={`Answer ${i+1}`}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm" 
                                    required
                                />
                                <input
                                    type="radio"
                                    id={`correct_${i}`}
                                    value={i}
                                    name="correct_answer"
                                    checked={formData.answer_text[i]?.is_correct || false}
                                    onChange={() => handleCorrectChange(i)}
                                    className="h-4 w-4"
                                />
                                <label htmlFor={`correct_${i}`} className="text-sm text-gray-700 whitespace-nowrap">
                                    Correct
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="answer_explanation" className="block text-sm font-medium text-gray-700 mb-2">
                        Answer Explanation
                    </label>
                    <textarea
                        id="answer_explanation"
                        name="answer_explanation"
                        value={formData.answer_explanation}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="Enter answer explanation"
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="is_active"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleChange}
                        className="h-4 w-4 border-gray-300 rounded"
                    />
                    <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                        Active question
                    </label>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={() => navigate('/questions')}
                        className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : 'Update Question'}
                    </button>
                </div>
            </form>
        </div>
    );
}