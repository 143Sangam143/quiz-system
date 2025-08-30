import { useUpdateQuiz } from "../../lib/hooks/quizzes/use-update-quiz";


export default function QuizEdit() {
    
    const { formData, questions, additionalData, loading, initialLoad, handleCategoryChange, handleQuestionChange, handleSubmit, handleChange } = useUpdateQuiz();

    if (loading && initialLoad) {
        return (
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="text-center">Loading quiz data...</div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-lg rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                    Edit Quiz
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Quiz Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter quiz title"
                    />
                </div>

                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                        Quiz Time (minutes) *
                    </label>
                    <input
                        type="number"
                        id="time"
                        name="time"
                        required
                        min="1"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter time in minutes"
                    />
                </div>

                {additionalData.categories && additionalData.categories.length > 0 && (
                    <div>
                        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
                            Categories * (Hold Ctrl/Cmd to select multiple)
                        </label>
                        <select
                            id="category_id"
                            name="category_id"
                            multiple
                            value={formData.category_id}
                            onChange={handleCategoryChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                            required
                        >
                            {additionalData.categories.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <p className="mt-1 text-xs text-gray-500">
                            Selected: {formData.category_id.length} categories
                        </p>
                    </div>
                )}

                {additionalData.difficulties && additionalData.difficulties.length > 0 && (
                    <div>
                        <label htmlFor="difficulty_id" className="block text-sm font-medium text-gray-700 mb-2">
                            Difficulty *
                        </label>
                        <select
                            id="difficulty_id"
                            name="difficulty_id"
                            value={formData.difficulty_id}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select difficulty</option>
                            {additionalData.difficulties.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {questions.length > 0 && (
                    <div>
                        <label htmlFor="question_id" className="block text-sm font-medium text-gray-700 mb-2">
                            Questions * (Hold Ctrl/Cmd to select multiple)
                        </label>
                        <select
                            id="question_id"
                            name="question_id"
                            multiple
                            value={formData.question_id}
                            onChange={handleQuestionChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[200px]"
                            required
                        >
                            {questions.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.question_text}
                                </option>
                            ))}
                        </select>
                        <p className="mt-1 text-xs text-gray-500">
                            Selected: {formData.question_id.length} questions out of {questions.length} available
                        </p>
                    </div>
                )}

                <div id="questionFeedback" className="text-sm text-orange-600"></div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="is_active"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                        Active Quiz
                    </label>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={loading || formData.question_id.length === 0}
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Updating...' : 'Update Quiz'}
                    </button>
                </div>
            </form>
        </div>
    );
}