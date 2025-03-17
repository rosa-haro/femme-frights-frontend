import { combineReducers } from "@reduxjs/toolkit";
import moviesReducer from "../../../components/movies/MoviesReducer";
import userReducer from "../../../components/user/UserReducer";

const reducers = combineReducers({
  moviesReducer, userReducer
});

export default reducers;
