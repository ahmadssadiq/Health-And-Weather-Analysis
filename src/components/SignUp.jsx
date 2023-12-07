import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/signup', {
                username, email, password
            });
            if (response.data.status === 'User created') {
                window.location.href = '/healthdata'; // Use React Router for navigation if possible
            } else {
                console.error('Signup failed:', response.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>

            {/* Sign Up Form */}
            <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-100 flex justify-center items-center p-8">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">Sign Up</h2>

                    {/* Username Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="******************"
                        />
                    </div>

                    {/* Sign Up Button */}
                    <div id="signInDiv" className="flex items-center justify-between space-x-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </button>
                        {/* Google Sign In Button (you can integrate Google Sign-In here) */}
                        <div className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            <i className="fab fa-google mr-2"></i> Login with Google
                        </div>
                    </div>
                    <p className="text-center text-gray-500 text-xs mt-6">
                        &copy;2023 Health & Weather Analyzer. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
