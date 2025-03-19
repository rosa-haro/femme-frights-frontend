import React, { useState } from 'react';
import { signInFetch } from '../../core/services/userFetch';
import { signInAction } from './UserActions';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validateSignInFields = () => {
        setError('');
        if (!username || !password) {
            setError('Username and password are required.');
            return false;
        }
        return true;
    };

    const signIn = async () => {
        if (!validateSignInFields()) return;
        try {
            const userInfo = await signInFetch(username, password);
            if (!userInfo || !userInfo.token) {
                setError('Invalid username or password.');
                return;
            }
            dispatch(signInAction(userInfo));
            navigate('/');
        } catch (error) {
            setError(error.message || 'An error occurred while signing in.');
        }
    };

    return (
        <div>
            {error && <div>{error}</div>}
            <div>
                <span>Username: </span>
                <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value.trim())} />
            </div>
            <div>
                <span>Password: </span>
                <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <button onClick={signIn}>Sign in</button>
            </div>
            <div>
                <span>Don't have an account yet? </span>
                <Link to="/signup">Sign up.</Link>
            </div>
        </div>
    );
};

export default LoginComponent;