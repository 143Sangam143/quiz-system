import React, {useState} from 'react';
import { Link } from 'react-router-dom'; // for React Router navigation

const menuItems = [
    { name: 'Categories', href: '/categories' },
    { name: 'Difficulty', href: '/difficulties'},
    { name: 'Questions', href: '/questions'},
    { name: 'Quizzes', href: '/quizzes'},
];

export function Sidebar() {
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
