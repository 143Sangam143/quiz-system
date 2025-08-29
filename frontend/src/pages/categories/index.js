import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiService from "../../api/service";
import { toast } from 'react-toastify';


export default function CategoryIndex() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState();

  const fetchCategories = async() => {
    try{
      setLoading(true);
      const res = await apiService.getCategories();
      setCategories(res.data);
    }catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCategories();
  },[]);

  const handleDelete = async (item) => {
    try{
      setLoading(true);
      const res = await apiService.deleteCategory(item.uri);
      if(res?.success){
        toast.success('Category deleted successfully!');
        fetchCategories();
      }else{
        console.warn('Category not delete');
      }
    }catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                    {'Category List'}
                </h3>
            </div>
      <div>
        <Link
          to="/categories/create"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add
        </Link>
      </div>
      {loading ? (
        <p className="text-gray-600">Loading data...</p>
      ) 
      : categories.length === 0 ? (
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
                  Active
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <input type="checkbox" name="is_active" checked={item.is_active} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/categories/edit/${item.uri}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Delete
                    </button>
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
