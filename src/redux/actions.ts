import { IMovie } from "../interfaces/IMovie";
import { ADD_FAVOURITE, REMOVE_FAVOURITE, GET_MOVIES, SET_TOTAL, SET_CURRENT_PAGE, INCREMENT_CURRENT_PAGE, CLEAR_MOVIES } from "./types";

const API_KEY = "89c318932a295f19478edd0ffc324cb4";
const MOVIE_URL = "https://api.themoviedb.org/3/movie/popular";

export function addFavourite(movie:IMovie){
    return{
        type: ADD_FAVOURITE,
        payload: movie
    }
}

export function removeFavourite(movie:IMovie){
    return{
        type: REMOVE_FAVOURITE,
        payload: movie
    }
}

export function getMovies(page:number){
    return async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        const response = await fetch(`${MOVIE_URL}?api_key=${API_KEY}&page=${page}`);
        const json = await response.json();
        console.log("page", page);
        dispatch({type: GET_MOVIES, payload: json.results});
        dispatch({type: SET_TOTAL, payload: json.total_pages});
    }      
}

export function clearMovies(){
    return{
        type: CLEAR_MOVIES       
    }
}

export function setCurrent(page:number){
    return{
        type: SET_CURRENT_PAGE,
        payload: page
    }
}

export function incrementCurrentPage(){
    return{
        type: INCREMENT_CURRENT_PAGE
    }
}



