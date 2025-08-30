import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
    const { user, role, logout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="flex flex-row justify-between">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Welcome Player!
                </h1>

                <div className="flex space-x-4">

                    {
                        <Link
                            to="/dashboard"
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                            Dashboard 
                        </Link>
                    }
                    

                    {user ? (
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link
                                    to={'/login'}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to={'/register'}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
