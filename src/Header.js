// Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const Header = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const isUserLoggedIn = user && Object.keys(user).length > 0;

    const handleSignOut = () => {
        setUser({});
        navigate('/');
    };

    return (
        <div className="header">
        <header className="flex justify-between items-center mb-6">
            {user && user.picture && (
                <img src={user.picture} alt="User" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            )}

            {/* Left part of the header with logo or app name */}
            <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-white p-2 shadow-lg">
                        <i className="fas fa-cloud-sun text-blue-500 text-2xl"></i>
                    </div>
                    <h1 className="text-xl text-gray-700 font-bold">Health & Weather Analyzer</h1>
                </div>

                {/* Right part of the header with user info and sign in/out */}
                <div className="flex items-center space-x-4">
                    {isUserLoggedIn ? (
                        // When user is logged in, show user icon, welcome message, and sign out option
                        <>
                            {user.photoURL && (
                                <img src={user.photoURL} alt="User" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                            )}
                            <span>Welcome, {user.displayName || user.email}</span>
                            <button onClick={handleSignOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Sign Out
                            </button>
                        </>
                    ) : (
                        // When no user is logged in, show sign up option
                        <Link to="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Sign Up
                        </Link>
                    )}
                </div>
        </header>
        </div>
    );
};

export default Header;