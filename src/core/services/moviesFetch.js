const apiUrlMovies = import.meta.env.VITE_API_URL + "/movies";

// Fetch all movies for home view
export const getAllMoviesFetch = async () => {
  try {
    const res = await fetch(`${apiUrlMovies}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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

// Fetch movie by ID
export const getMovieById = async (id) => {
  try {
    const res = await fetch(`${apiUrlMovies}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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

// Search movies by title
export const searchMoviesFetch = async (title) => {
  try {
    const res = await fetch(`${apiUrlMovies}/search/title?title=${title}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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

// Sort movies alphabetically (A-Z)
export const sortMoviesAZFetch = async () => {
  try {
    const res = await fetch(`${apiUrlMovies}/sort/alphabetical`);
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

// Sort movies by year (ascending)
export const sortMoviesByYearAscFetch = async () => {
  try {
    const res = await fetch(`${apiUrlMovies}/sort/year-asc`);
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

// Sort movies by year (descending)
export const sortMoviesByYearDescFetch = async () => {
  try {
    const res = await fetch(`${apiUrlMovies}/sort/year-desc`);
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
