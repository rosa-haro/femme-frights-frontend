import React from 'react'
import NavMenuComponent from '../menu/NavMenuComponent'
import { useLocation, useNavigate } from 'react-router-dom'

const HeaderComponent = () => {
  const navigate = useNavigate()

  const goToSignIn = () => {
    navigate("/signin")
  }

  return (
    <header>
      <div>
      <img src={new URL("../../../public/logo.png", import.meta.url).href} alt="Femme Frights logo" />
      <h1>Femme Frights</h1>
      <button onClick={goToSignIn}>Sign In</button>
      </div>
      <NavMenuComponent />

    </header>
  )
}

export default HeaderComponent