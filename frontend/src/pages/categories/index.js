
import { Link } from "react-router-dom";
import { useListCategory } from "../../lib/hooks/categories/use-list-category";
import { useGlobalHook } from "../../lib/hooks/use-global-hook";

export default function CategoryIndex() {
  const {categories,loading, setCategories, handleDelete} = useListCategory();
  const {handleToggleActive} = useGlobalHook({setLists:setCategories});

  return (
    <div className="bg-white shadow rounded-lg">
      {
        loading ? (
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
                    S.N
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
                    Active ?
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((item,index) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <input type="checkbox" name="is_active" checked={item.is_active} onChange={(e) => handleToggleActive(item.id, e.target.name, e.target.checked,item.model)} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <div className="flex flex-wrap place-content-end gap-[10px]">
                        <button
                          className="bg-blue-500 text-white hover:bg-blue-600 transition font-medium rounded-lg text-xs px-4 py-2"
                        >
                          <Link
                            to={`/categories/edit/${item.uri}`}
                          >
                            Edit
                          </Link>
                        </button>
                        {!item.questions.length > 0 ?
                          (
                            <button
                              onClick={() => handleDelete(item)}
                              className="bg-red-500 text-white hover:bg-red-600 transition font-medium rounded-lg text-xs px-4 py-2"
                            >
                              Delete
                            </button>
                          ) : (
                            <button
                              onClick={() => handleDelete(item)}
                              disabled
                              className="cursor-not-allowed bg-gray-200 text-white transition font-medium rounded-lg text-xs px-4 py-2"
                            >
                              Delete
                            </button>
                          )
                        }
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  );
}
