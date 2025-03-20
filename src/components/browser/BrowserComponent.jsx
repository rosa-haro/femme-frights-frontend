import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchMoviesFetch } from '../../core/services/moviesFetch'
import { searchMoviesAction } from '../movies/MoviesActions'

const BrowserComponent = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const { searchResults } = useSelector((state) => state.moviesReducer)

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

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