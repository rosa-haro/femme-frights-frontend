import React, { useState } from 'react';
import { signUpFetch } from '../../core/services/userFetch';
import { signUpAction } from './UserActions';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const SignupComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [registerInfo, setRegisterInfo] = useState({});
    const [error, setError] = useState('');

    const handleProfilePicture = (e) => {
        setRegisterInfo({ ...registerInfo, profilePicture: e.target.files[0] });
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateSignUpFields = () => {
        setError('');
        if (!registerInfo.name || !registerInfo.lastName || !registerInfo.username || !registerInfo.email || !registerInfo.password) {
            setError('All (*) fields are required.');
            return false;
        }
        if (registerInfo.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return false;
        }
        if (!validateEmail(registerInfo.email)) {
            setError('Invalid email format.');
            return false;
        }
        if (registerInfo.username.includes(' ')) {
            setError('Username cannot contain spaces.');
            return false;
        }
        if (!/^[a-zA-Z]+$/.test(registerInfo.name) || !/^[a-zA-Z]+$/.test(registerInfo.lastName)) {
            setError('Name and Last Name must contain only letters.');
            return false;
        }
        return true;
    };

    const signUp = async () => {
        if (!validateSignUpFields()) return;
        try {
            const userInfo = await signUpFetch(registerInfo);
            if (!userInfo) {
                setError('Signup failed. Try again.');
                return;
            }
            dispatch(signUpAction(userInfo));
            navigate('/');
        } catch (error) {
            setError(error.message || 'An error occurred while signing up.');
        }
    };

    const registerInputHandler = (name, value) => {
        setRegisterInfo({ ...registerInfo, [name]: value.trim() });
    };

    return (
        <div>
            {error && <div>{error}</div>}
            <div>
                <span>Name (*): </span>
                <input type="text" placeholder='Name' name='name' onChange={(e) => registerInputHandler(e.target.name, e.target.value)} />
            </div>
            <div>
                <span>Last name (*): </span>
                <input type="text" placeholder='Lastname' name='lastName' onChange={(e) => registerInputHandler(e.target.name, e.target.value)} />
            </div>
            <div>
                <span>Username (*): </span>
                <input type="text" placeholder='Username' name='username' onChange={(e) => registerInputHandler(e.target.name, e.target.value)} />
            </div>
            <div>
                <span>E-mail (*): </span>
                <input type="email" placeholder='Email' name='email' onChange={(e) => registerInputHandler(e.target.name, e.target.value)} />
            </div>
            <div>
                <span>Password (*): </span>
                <input type="password" placeholder='Password' name='password' onChange={(e) => registerInputHandler(e.target.name, e.target.value)} />
            </div>
            <div>
                <span>Profile picture: </span>
                <input type="file" accept="image/*" onChange={handleProfilePicture} />
            </div>
            <div>
                <button onClick={signUp}>Sign up</button>
            </div>
            <div>
                <span>Already have an account? </span>
                <Link to="/signin">Sign in.</Link>
            </div>
        </div>
    );
};

export default SignupComponent;
