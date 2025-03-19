// import React, { useState } from 'react'
// import { signInFetch, signUpFetch } from '../../core/services/userFetch'
// import { signInAction, signUpAction } from './UserActions'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, useLocation, useNavigate } from 'react-router-dom'

// const SignInSignUpComponent = () => {

//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const location = useLocation()
//     const { pathname } = location;

//     // const { user } = useSelector(state => state.userReducer)
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const [registerInfo, setRegisterInfo] = useState({})
//     const [error, setError] = useState('')

//     const handleFileChange = (e) => {
//         setRegisterInfo({
//             ...registerInfo,
//             profilePicture: e.target.files[0],
//         })
//     }
    
//     const validateSignInFields = () => {
//         setError("");
//         if (!username || !password) {
//             setError("Username and password are required.")
//             return false
//         }
//         return true;
//     };

//     const validateSignUpFields = () => {
//         setError("");
//         if (!registerInfo.name || !registerInfo.lastName || !registerInfo.username || !registerInfo.email || !registerInfo.password) {
//             setError("All (*) fields are required.");
//             return false;
//         }
//         if (registerInfo.password.length < 8) {
//             setError("Password must be at least 8 characters long.");
//             return false;
//         }
//         return true;
//     }

//     const signIn = async () => {
//         if (!validateSignInFields()) return;
//         try {
//             const userInfo = await signInFetch(username, password);
//             console.log("Sign-in response:", userInfo)
//             if (!userInfo || !userInfo.token) {
//                 setError("Invalid username or password.");
//                 return;
//             }
//             dispatch(signInAction(userInfo));
//             goHome();
//         } catch (error) {
//             setError(error.message || "An error occurred while signing in.");
//         }
//     };
    

//     const signUp = async () => {
//         if (!validateSignUpFields()) return;
//         try {
//             const userInfo = await signUpFetch(registerInfo);
//             if (!userInfo) {
//                 setError("Signup failed. Try again.");
//                 return;
//             }
//             dispatch(signUpAction(userInfo));
//             goHome();
//         } catch (error) {
//             setError(error.message || "An error occurred while signing up.");
//         }
//     };

//     const registerInputHandler = (name, value) => {
//         setRegisterInfo({
//             ...registerInfo,
//             [name]: value
//         })
//     }

//     const goHome = () => {
//         navigate("/")
//     }

//   return (
//     <>
//     {error && <div>{error}</div>}
//     { pathname === "/signin" ? (

//     <div>
//         <div>
//             <span>Username: </span>
//             <input type="text" placeholder='Username' name='username' onChange={(e) => setUsername(e.target.value)}/>
//         </div>
//         <div>
//             <span>Password: </span>
//             <input type="password" placeholder='Password' name='password' onChange={(e) => setPassword(e.target.value)}/>
//         </div>
//         <div>
//             <button onClick={signIn}>Sign in</button>
//         </div>
//         <div>
//             <span>Don't have an account yet? </span>
//             <Link to="/signup">Sign up.</Link></div>
//     </div>
//     ) : (

//     <div>
//         <div>
//             <span>Name (*): </span>
//             <input type="text" placeholder='Name' name='name' onChange={(e) => registerInputHandler(e.target.name, e.target.value)} />
//         </div>
//         <div>
//             <span>Last name (*): </span>
//             <input type="text" placeholder='Lastname' name='lastName' onChange={(e) => registerInputHandler(e.target.name, e.target.value)} />
//         </div>
//         <div>
//             <span>Username (*): </span>
//             <input type="username" placeholder='Username' name='username' onChange={(e) => registerInputHandler(e.target.name, e.target.value)} />
//         </div>
//         <div>
//             <span>E-mail (*): </span>
//             <input type="email" placeholder='Email' name='email' onChange={(e) => registerInputHandler(e.target.name, e.target.value)} />
//         </div>
//         <div>
//             <span>Password (*): </span>
//             <input type="password" placeholder='Password' name='password' onChange={(e) => registerInputHandler(e.target.name, e.target.value)} />
//         </div>
//         <div>
//             <span>Profile picture: </span>
//             <input type="file" accept="image/*" onChange={handleFileChange} />
//         </div>
//         <div>
//             <button onClick={signUp}>Sign up</button>
//         </div>
//         <div>
//             <span>Already have an account? </span>
//             <Link to="/signin">Sign in.</Link>
//         </div>
//     </div>

//     )}

//     </>
//   )
// }

// export default SignInSignUpComponent