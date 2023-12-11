import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import { UserContext } from './UserContext';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            navigate('/'); // Navigate to home or dashboard
        } catch (authError) {
            setError(authError.message);
        }
    };
    return (
        <div className="sign-in-container">
            <form onSubmit={handleSignIn} className="sign-in-form">
                <div className="container">
                    <div className="form-container">
                        <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">Sign In</h2>
                            <div className="form-group bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
                            {/* Email Input */}
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                />
                            </div>
                            <div className="form-group bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
                            {/* Password Input */}
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                            </div>
                            <div className="form-group bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {/* Error Message */}
                            {error && <p className="error-message">{error}</p>}
                            </div>
                                <div className="form-group bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                {/* Sign In Button */}
                                    <button type="submit">Sign In</button>
                                <div />
                            </div>
                            <div className="google-signin-btn" id="googleSignInDiv">
                            {/* Google Sign-In Button */}
                            </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default SignIn;
