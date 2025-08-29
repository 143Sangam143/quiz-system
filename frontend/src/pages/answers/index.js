import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiService from "../../api/service";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";


export default function AnswerIndex() {
  const { uri } = useParams();
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState();

  const fetchAnswers = async() => {
    try{
      setLoading(true);
      const res = await apiService.getAnswersByQuestionUri(uri);
      setAnswers(res.data);
    }catch (error) {
      console.error("Error fetching answer:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchAnswers();
  },[]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                    {'Answer List'}
                </h3>
            </div>
      <div>
    </div>
      {loading ? (
        <p className="text-gray-600">Loading data...</p>
      ) 
      : answers.length === 0 ? (
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
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Correct
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {answers.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.answer_text}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <input type="checkbox" name="is_correct" checked={item.is_correct} />
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
