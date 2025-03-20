import { combineReducers } from "@reduxjs/toolkit";
import moviesReducer from "../../../components/movies/MoviesReducer";
import userReducer from "../../../components/user/UserReducer";
import globalReducer from "./global/GlobalReducer";

const reducers = combineReducers({
  moviesReducer, userReducer, globalReducer
});

export default reducers;
