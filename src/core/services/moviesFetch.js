const apiUrlMovies = import.meta.env.VITE_API_URL + "/movies";

export const getAllMoviesFetch = async () => {
  try {
    const res = await fetch(`${apiUrlMovies}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result.message || `Error: ${res.status} - ${res.statusText}`
      );
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const getMovieById = async (id) => {
  try {
    const res = await fetch(`${apiUrlMovies}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result.message || `Error: ${res.status} - ${res.statusText}`
      );
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const searchMoviesFetch = async (title) => {
  try {
    const res = await fetch(`${apiUrlMovies}/search/title?title=${title}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result.message || `Error: ${res.status} - ${res.statusText}`
      );
    }

    return result;
  } catch (error) {
    throw error;
  }
};
