import { Link } from "react-router-dom";
import { useQuizList } from "../../lib/hooks/user/use-quiz-list";

export default function QuizListUser() {
  
  const { quizzes, loading } = useQuizList();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          {'Quiz List'}
        </h3>
      </div>
      {loading ? (
        <p className="text-gray-600">Loading data...</p>
      ) 
      : quizzes.length === 0 ? (
        <p className="text-gray-600">No data found.</p>
      ) 
      : 
      (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Number of Player who played
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Highest Score
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Play</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quizzes.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.total_players}
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.highest_score ?? 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/quiz-play/${item.uri}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Play
                    </Link>
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
