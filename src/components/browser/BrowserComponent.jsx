import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchMoviesFetch } from '../../core/services/moviesFetch'
import { resetBrowserAction, searchMoviesAction } from '../movies/MoviesActions'
import { useLocation } from 'react-router-dom'

const BrowserComponent = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const location = useLocation()

    const { favorites, watchlist } = useSelector((state) => state.userReducer)

    // This useEffect resets the browser everytime location changes
    useEffect(() => {
        dispatch(resetBrowserAction())
        setQuery("")
    }, [location.pathname])

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        // To make the query case-insensitive
        const searchTerm = query.toLowerCase()

        // In the favlist and watchlist, local search (redux) instead of calling the API
        if (location.pathname === "/favorites") {
            const results = favorites.filter(movie =>
                movie.titleEnglish.toLowerCase().includes(searchTerm)
            );
        dispatch(searchMoviesAction(results))
        return;
        }

        if (location.pathname === "/watchlist") {
            const results = watchlist.filter(movie =>
                movie.titleEnglish.toLowerCase().includes(searchTerm)
            );
            dispatch(searchMoviesAction(results));
            return
        }

        // General movie list: API call
        try {
            const results = await searchMoviesFetch(query)
            dispatch(searchMoviesAction(results))
            console.log(results)
        } catch (error) {
            console.error("Error fetching search results:", error)
        }
    }

  return (
    <div>
        <form onSubmit={handleSearch}>
            <input type="text" placeholder='Search by title...' value={query} onChange={(e) => setQuery(e.target.value)} />
            <button type="submit">Search</button>
            
        </form>
    </div>
  )
}

export default BrowserComponent