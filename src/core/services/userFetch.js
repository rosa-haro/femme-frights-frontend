const apiUrl = import.meta.env.VITE_API_URL;

export const signInFetch = async (username, password) => {
  const res = await fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const result = await res.json();
  return result.user;
};

export const signUpFetch = async (newUser) => {
    console.log(newUser)
  const res = await fetch(`${apiUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify(newUser),
  });

  const result = await res.json();
  console.log("Respuesta JSON:", result)
  return result.user;
};
