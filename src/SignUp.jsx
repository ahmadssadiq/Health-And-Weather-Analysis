// password being setup properly, as firebase requires actual password, and in fact, being salted at the server side
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import jwt_decode from 'jwt-decode';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // import useNavigate
import "./SignUp.css";
import { UserContext } from './UserContext'; // import UserContext


function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useContext(UserContext); // Use UserContext
    const [message, setMessage] = useState(null); // For displaying messages to the user
    const [error, setError] = useState(null); // For displaying error messages
    const [success, setSuccess] = useState(''); // State to manage success messages

    // Hook for navigating to another route on success
    const navigate = useNavigate();
    
    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);
        document.getElementById("googleSignInDiv").hidden = true;
        navigate('/'); // Navigates to the home page
    }

    function handleSignOut(event) {
        setUser({});
        document.getElementById("googleSignInDiv").hidden = false;
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "850002868075-riog8tkerkj6rm9p4981v1c208i7fi64.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("googleSignInDiv"),
            { theme: "outline", size: "large" }
        );

        google.accounts.id.prompt();
    }, []);

    // ... handleSignUp function
  const handleSignUp = (e) => {
    e.preventDefault();
    setError(''); // Clear any existing errors

    // Get the Firebase auth object
    const auth = getAuth();

    // Call Firebase to create a new user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User signed up successfully
        const user = userCredential.user;
        
        // Set the user in your context/state
        setUser(user);

        // Navigate to the main page
        navigate('/'); // Assuming your main page is at the root
      })
      .catch((error) => {
        // Set error state to display the error message
        setError(`Sign-up failed: ${error.message}`);
      });
  };

    return (
        <div>
            {/* Success message box, only shown when the success message is set */}
            {success && <div className="success-box">{success}</div>}
           {/* Error message box */}
            {error && <div className="error-box">{error}</div>}
            <Link to="/signin" className="sign-in-link bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
                Already have an account? Sign in
            </Link>
            <form onSubmit={handleSignUp}>
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
                    <div className="mb-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Google Sign In Button */}
                    <div id="googleSignInDiv" className="mb-4"></div>

                    {/* Sign Out Button (shown when user is logged in) */}
                    {Object.keys(user).length !== 0 &&
                        <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Sign Out
                        </button>
                    }

                    <p className="text-center text-gray-500 text-xs mt-6">
                        &copy;2023 Health & Weather Analyzer. All rights reserved.
                    </p>
                </div>
            </div>
            </form>
        </div>
    );
}

export default SignUp;
