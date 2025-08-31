import { usePlayerHistory } from "../../lib/hooks/user/use-player-history";


export default function History() {
    
    const {results, loading} = usePlayerHistory();

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                    {'Result History'}
                </h3>
            </div>
            {loading ? (
                <p className="text-gray-600">Loading data...</p>
            ) 
            : results.length === 0 ? (
                <p className="text-gray-600">No data found.</p>
            ) 
            : 
            (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Started At</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed At</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {results.map((attempt,index) => (
                            <tr key={attempt.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{attempt.quiz?.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{attempt.score ?? 0}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {attempt.started_at ? new Date(attempt.started_at).toISOString().slice(0, 19).replace("T", " ") : '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {attempt.finished_at ? new Date(attempt.finished_at).toISOString().slice(0, 19).replace("T", " ") : '-'}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}