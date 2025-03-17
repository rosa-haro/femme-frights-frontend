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

    const result = await res.json();
    
    if (!res.ok) {
      throw new Error(result.message || `Error: ${res.status} - ${res.statusText}`);
    }

    return result.user;
  } catch (error) {
    throw error;
  }
};

export const signUpFetch = async (newUser) => {
  try {
    const res = await fetch(`${apiUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
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