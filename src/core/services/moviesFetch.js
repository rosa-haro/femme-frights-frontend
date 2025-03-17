const apiUrlMovies = import.meta.env.VITE_API_URL + "/movies";

export const getAllMoviesFetch = async () => {
  const res = await fetch(`${apiUrlMovies}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status} - ${res.statusText}`);
  }

  const result = await res.json();

  return result;
};

export const getMovieById = async (id) => {
    const res = await fetch(`${apiUrlMovies}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }
  
    const result = await res.json();
  
    return result;
  };