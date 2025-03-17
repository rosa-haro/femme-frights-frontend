import React, { useState } from 'react'
import { signInFetch, signUpFetch } from '../../core/services/userFetch'
import { signInAction, signUpAction } from './UserActions'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const SignInSignUpComponent = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { pathname } = location;

    // const { user } = useSelector(state => state.userReducer)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [registerInfo, setRegisterInfo] = useState({})
    
    const signIn = async () => {
        const userInfo = await signInFetch(username, password)
        console.log(userInfo)
        dispatch(signInAction(userInfo))
        console.log("You're logged in.")
        goHome()
    }

    const signUp = async () => {
        const userInfo = await signUpFetch(registerInfo)
        dispatch(
            signUpAction(userInfo)
        )
        console.log("You signed up.")
        goHome()
    }

    const registerInputHandler = (name, value) => {
        setRegisterInfo({
            ...registerInfo,
            [name]: value
        })
    }


    const goHome = () => {
        navigate("/")
    }

  return (
    <>

    { pathname === "/signin" ? (

    <div>
        <div>
            <span>Username: </span>
            <input type="text" placeholder='Username' name='username' onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
            <span>Password: </span>
            <input type="password" placeholder='Password' name='password' onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
            <button onClick={signIn}>Sign in</button>
        </div>
        <div>
            <span>Don't have an account yet? </span>
            <Link to="/signup">Sign up.</Link></div>
    </div>
    ) : (

    <div>
        <div>
            <span>Name: </span>
            <input type="text" placeholder='Name' name='name' onChange={(e) => registerInputHandler(e.target.name, e.target.value)} />
        </div>
        <div>
            <span>Last name: </span>
            <input type="text" placeholder='Lastname' name='lastName' onChange={(e) => registerInputHandler(e.target.name, e.target.value)} />
        </div>
        <div>
            <span>Username: </span>
            <input type="username" placeholder='Username' name='username' onChange={(e) => registerInputHandler(e.target.name, e.target.value)} />
        </div>
        <div>
            <span>E-mail: </span>
            <input type="email" placeholder='Email' name='email' onChange={(e) => registerInputHandler(e.target.name, e.target.value)} />
        </div>
        <div>
            <span>Password: </span>
            <input type="password" placeholder='Password' name='password' onChange={(e) => registerInputHandler(e.target.name, e.target.value)} />
        </div>
        <div>
            <span>Profile picture: </span>
            <span>Upload your picture here.</span>
        </div>
        <div>
            <button onClick={signUp}>Sign up</button>
        </div>
        <div>
            <span>Already have an account? </span>
            <Link to="/signin">Sign in.</Link>
        </div>
    </div>

    )}

    </>
  )
}

export default SignInSignUpComponent