import { useCreateQuestion } from "../../lib/hooks/questions/use-create-question";


export default function QuestionCreate() {
   
    const { formData, additionalData, loading, handleChange, handleAnswerTextChange, handleCorrectChange, handleSubmit} = useCreateQuestion();

    return (
        <div className="bg-white shadow-lg rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                    {'Create Question'}
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Question Text *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="question_text"
                        required
                        value={formData.question_text}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter question text"
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

                {additionalData.categories &&
                    <div className="flex items-center">
                        <label className="ml-2 block text-sm text-gray-700">
                            Categories
                        </label>
                        <select
                            name="category_id"
                            value={formData.category_id || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        >
                            <option value="" disabled>Select category</option>
                            {additionalData.categories.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                }

                {additionalData.difficulties &&
                    <div className="flex items-center">
                        <label className="ml-2 block text-sm text-gray-700">
                            Difficulties
                        </label>
                        <select
                            name="difficulty_id"
                            value={formData.difficulty_id || ''}
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
                }

                <div className="space-y-2">
                    {[0,1,2,3].map(i => (
                        <div key={i} className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={formData.answer_text[i]?.text || ''}
                                onChange={e => handleAnswerTextChange(i, e.target.value)}
                                name='answer[]'
                                placeholder={`Answer ${i+1}`}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required
                            />
                            <input
                                type="radio"
                                id={`correct_${i}`}
                                value={i}
                                name="correct_answer"
                                checked={formData.answer_text[i]?.is_correct || false}
                                onChange={() => handleCorrectChange(i)}
                            />
                            <label htmlFor={`correct_${i}`} className="text-sm text-gray-700">Correct</label>
                        </div>
                    ))}
                </div>

                <div className="flex items-center">
                    <label className="ml-2 block text-sm text-gray-700">
                        Answer Explanation
                    </label>
                    <textarea
                        name="answer_explanation"
                        value={formData.answer_explanation}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="Enter answer explanation"
                    />
                </div>

                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : 'Create Question'}
                    </button>
                </div>
            </form>
        </div>
    );
}
