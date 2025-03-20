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
    const formData = new FormData();
    for (const key in newUser) {
      formData.append(key, newUser[key])
    }

    const res = await fetch(`${apiUrl}/signup`, {
      method: "POST",
      body: formData,
    });

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
    const res = await fetch(`${apiUrl}/users/myprofile`, {
      method: "PATCH",
      headers: {
        "auth-token": token,
        "Content-type": "application/JSON"
      },
      body: JSON.stringify(updatedUserData)
    });
    console.log(updatedUserData)
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error: ${res.status} - ${errorText}`);
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};