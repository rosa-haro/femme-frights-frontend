import React from 'react'
import NavMenuComponent from '../menu/NavMenuComponent'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signOutAction } from '../user/UserActions'

const HeaderComponent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isLogged, user } = useSelector((state) => state.userReducer)

  const goToSignIn = () => {
    navigate("/signin")
  }

  const goHome = () => {
    navigate("/")
  }

  const signOutHandler = () => {
    dispatch(signOutAction())
    goHome()
  }

  return (
    <header>
      <div>
      <img src={new URL("../../../public/logo.png", import.meta.url).href} alt="Femme Frights logo" />
      <h1>Femme Frights</h1>
      <button onClick={isLogged ? signOutHandler : goToSignIn}>
          {isLogged ? "Sign Out" : "Sign In"}
        </button>
      </div>
      <div>
        <span>
          {isLogged? `Hi, ${user.name}!` : null}
          </span>
      <NavMenuComponent />
      </div>
    </header>
  )
}

export default HeaderComponent