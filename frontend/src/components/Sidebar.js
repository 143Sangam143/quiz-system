
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';

export function Sidebar() {
    const { user, role, logout } = useAuth();
    let menuItems = [];
    if(role == 'admin'){
         menuItems = [
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'Categories', href: '/categories' },
            { name: 'Difficulty', href: '/difficulties'},
            { name: 'Questions', href: '/questions'},
            { name: 'Quizzes', href: '/quizzes'},
        ];
    }
    if(role == 'user'){
        menuItems = [
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'Quiz List', href: '/quiz-list' },
            // { name: 'Play Quiz', href: '/difficulties'},
            { name: 'History', href: `/history/${user.id}`}
        ];
    }
    const handleLogout = async () => {
        try{
          await logout();
          navigate("/login");
        } catch (error) {
          console.error("Logout failed:", error);
        }
    
    }

    return (
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg flex flex-col">
            <div className="flex items-center justify-center h-16 bg-gray-300 border-b border-gray-400 shadow-sm">
                <h1 className="text-xl font-bold text-gray-800">
                    {user.name}
                </h1>
            </div>

            <nav className="mt-5 px-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        end={false} // 🔑 keeps link active for sub-routes like /categories/*
                        className={({ isActive }) =>
                            `group flex items-center px-2 py-2 text-base font-medium rounded-md mb-1
                            ${isActive
                                ? 'bg-gray-200 text-gray-900 font-semibold'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-200 mt-auto">
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
