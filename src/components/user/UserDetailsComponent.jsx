import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from 'react-router-dom'
import { getUserByIdFetch } from "../../core/services/userFetch";
import { getUserDetailsAction, signOutAction } from "./UserActions";

const UserDetailsComponent = () => {
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.userReducer);

  console.log("Redux Token:", token)

  const loadUserDetails = async () => {
    if (!token) {
      console.error("No hay token disponible. Cerrando sesión...");
      dispatch(signOutAction()); // ✅ Deslogear si no hay token
      return;
    }

    try {
      const auxUser = await getUserByIdFetch(token);
      dispatch(getUserDetailsAction(auxUser));
    } catch (error) {
      console.error("Error obteniendo los detalles del usuario:", error);
      dispatch(signOutAction()); // ✅ Cerrar sesión si hay error con el usuario
    }
  };

  useEffect(() => {
    if (token) {
      loadUserDetails();
    }
  }, [token]);

  return (
    <div>
      {!user ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <div>
            <span>Name: </span>
            <span>{user.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsComponent;
