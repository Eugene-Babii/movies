import React from 'react';
import { IMovie } from "../interfaces/IMovie";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/rootReducer";
import { useSelector } from "react-redux";



export const DetailsPage: React.FC = () => {
    let params = useParams();

    const allMovies: IMovie[] = useSelector(
        (state: RootState) => state.movies.allMovies
      );

    let movie = allMovies.find(movie => String(movie.id) === String(params.id))
    

    return (
        <>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            {/* <button className="btn" onClick={()=>history.push("/")}>Back</button> */}
        </>
    )
}