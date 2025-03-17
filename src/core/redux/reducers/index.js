import { combineReducers } from "@reduxjs/toolkit";
import moviesReducer from "../../../components/movies/MoviesReducer";

const reducers = combineReducers({
  moviesReducer,
});

export default reducers;
