// Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const Header = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        setUser({});
        navigate('/signup');
    };

    return (
        <header className="flex justify-between items-center mb-6">
            {/* Display user's picture if available */}
            {user && user.picture && (
                <img src={user.picture} alt="User" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            )}

            <div className="flex items-center space-x-4">
                <div className="rounded-full bg-white p-2 shadow-lg">
                    <i className="fas fa-cloud-sun text-blue-500 text-2xl"></i>
                </div>
                <h1 className="text-xl text-gray-700 font-bold">Health & Weather Analyzer</h1>
            </div>

            <div className="flex space-x-4">
                {user && user.picture ? (
                    <button onClick={handleSignOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Sign Out
                    </button>
                ) : (
                    <Link to="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Sign Up
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;