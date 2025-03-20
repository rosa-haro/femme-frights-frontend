const apiUrl = import.meta.env.VITE_API_URL;

export const signInFetch = async (username, password) => {
  try {
    const res = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    console.log("Sign-in API response status: ", res.status)

    const result = await res.json();
    console.log("Raw API response status: ", res.status)
    
    if (!res.ok) {
      throw new Error(result.message || `Error: ${res.status} - ${res.statusText}`);
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const signUpFetch = async (newUser) => {
  try {
    let options = { method: "POST" };

    if (newUser instanceof FormData) {
      options.body = newUser;
    } else {
      options.headers = { "Content-Type": "application/json" };
      options.body = JSON.stringify(newUser);
    }

    const res = await fetch(`${apiUrl}/signup`, options);
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || `Error: ${res.status} - ${res.statusText}`);
    }

    return result.user;
  } catch (error) {
    throw error;
  }
};

export const getUserByIdFetch = async (token) => {
  if (!token) {
    console.error("No token available in getUserByIdFetch.");
    return null;
  }

  try {
    console.log("Fetching with token: ", token);
    const res = await fetch(`${apiUrl}/users/myprofile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${token}`
            }
    });

    console.log("API Response Status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error response text:", errorText);
      throw new Error(`Error: ${res.status} - ${errorText}`);
    }

    const userData = await res.json();
    console.log("User data received from API:", userData);
    return {user: userData, token}; //ESTO ES LO QUE HE HECHO PARA ARREGLAR EL PROBLEMA!!!
  } catch (error) {
    console.error("Error in getUserByIdFetch:", error.message);
    return null;
  }
};

export const deleteLoggedUserFetch = async (token) => {
  if (!token) {
    console.error("No token available in deleteLoggedUserFetch.");
    return null;
  }

  try {
    const res = await fetch(`${apiUrl}/users/myprofile`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${token}`
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error: ${res.status} - ${errorText}`);
    }

    return { message: "User deleted successfully" };
  } catch (error) {
    throw error;
  }
};

export const updateUserFetch = async (token, updatedUserData) => {
  if (!token) {
    console.error("No token available in updateUserFetch.");
    return null;
  }

  try {
    let options = {
      method: "PATCH",
      headers: {
        "auth-token": token
      }
    };

    if (updatedUserData instanceof FormData) {
      options.body = updatedUserData;
      console.log("🚀 Enviando FormData a la API:", [...updatedUserData.entries()]); // Depuración
    } else {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(updatedUserData);
      console.log("🚀 Enviando JSON a la API:", options.body); // Depuración
    }

    const res = await fetch(`${apiUrl}/users/myprofile`, options);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error: ${res.status} - ${errorText}`);
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const toggleFavoriteFetch = async (token, idMovie) => {
  if (!token) {
    console.error("No token available in toggleFavoriteFetch.");
    return null;
  }

  try {
    const res = await fetch(`${apiUrl}/users/favorites/${idMovie}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error: ${res.status} - ${errorText}`);
    }

    const result = await res.json();
    return result.favorites;
  } catch (error) {
    console.error("Error in toggleFavoriteFetch:", error.message);
    throw error;
  }
};

export const toggleWatchlistFetch = async (token, idMovie) => {
  if (!token) {
    console.error("No token available in toggleWatchlistFetch.");
    return null;
  }

  try {
    const res = await fetch(`${apiUrl}/users/watchlist/${idMovie}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error: ${res.status} - ${errorText}`);
    }

    const result = await res.json();
    return result.watchlist; 
  } catch (error) {
    console.error("Error in toggleWatchlistFetch:", error.message);
    throw error;
  }
};