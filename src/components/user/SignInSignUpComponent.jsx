import React, { useState } from 'react'
import { signInFetch } from '../../core/services/userFetch'
import { signInAction } from './UserActions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SignInSignUpComponent = () => {

    // const { user } = useSelector(state => state.userReducer)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signIn = async () => {
        const userInfo = await signInFetch(username, password)
        console.log(userInfo)
        dispatch(signInAction(userInfo))
        goHome()
    }

    const goHome = () => {
        navigate("/")
    }

  return (
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
    </div>
  )
}

export default SignInSignUpComponent