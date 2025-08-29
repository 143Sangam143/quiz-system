import React, {useState} from 'react';
import { Link } from 'react-router-dom'; // for React Router navigation
import { useAuth } from '../context/AuthContext';

export function Sidebar() {
    const { user, role } = useAuth();
    let menuItems = [];
    if(role == 'admin'){
         menuItems = [
            { name: 'Categories', href: '/categories' },
            { name: 'Difficulty', href: '/difficulties'},
            { name: 'Questions', href: '/questions'},
            { name: 'Quizzes', href: '/quizzes'},
        ];
    }
    if(role == 'user'){
        menuItems = [
            { name: 'Quiz List', href: '/quiz-list' },
            // { name: 'Play Quiz', href: '/difficulties'},
            { name: 'History', href: `/history/${user.id}`}
        ];
    }
    return (
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
            <div className="flex items-center justify-center h-16 bg-blue-600">
                <h1 className="text-xl font-bold text-white">Quiz Admin</h1>
            </div>

            <nav className="mt-5 px-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.href}
                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 mb-1"
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
