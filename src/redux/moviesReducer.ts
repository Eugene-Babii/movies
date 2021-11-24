import { ADD_FAVOURITE, REMOVE_FAVOURITE, GET_MOVIES, SET_TOTAL, SET_CURRENT_PAGE, INCREMENT_CURRENT_PAGE, CLEAR_MOVIES, SET_FAVOURITES} from "./types";
import { IRootState } from "../interfaces/IRootState";

const initialState: IRootState={
    allMovies: [],
    favourites: [],
    totalPages: 3,
    currentPage: 1
}

export const moviesReducer = (state = initialState, action: { type: any; payload?: any; })=>{
    switch(action.type){
        case ADD_FAVOURITE:
            return {...state, favourites: state.favourites.concat(action.payload)};

        case REMOVE_FAVOURITE:
            return {...state, favourites: state.favourites.filter(m => m.id !== action.payload)}
            
        case GET_MOVIES:
            return {...state, allMovies: state.allMovies.concat(action.payload)};

        case CLEAR_MOVIES:
            return {...state, allMovies: []};

        case SET_TOTAL:
            return {...state, totalPages: action.payload};

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.payload};

        case INCREMENT_CURRENT_PAGE:
            return {...state, currentPage: state.currentPage++};

        case SET_FAVOURITES:
            return {...state, favourites: action.payload};

        default: return state;
    }    
}