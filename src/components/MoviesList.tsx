import React from "react";
import { IMovie } from "../interfaces/IMovie";

const IMAGE_URL = "http://image.tmdb.org/t/p/w342";

type MoviesListProps = {
    movies: IMovie[]
}

export const MoviesList: React.FC<MoviesListProps> = ({movies})=>{
    return(
        <div className="row g-3">
            {movies.map(movie=>{
                const poster_url = IMAGE_URL + movie.poster_path;                
                return(
                    <div className="col-sm-6 col-md-4 col-lg-3 text-center relative" key={movie.id}>                            
                        <img src={poster_url} className="img-thumbnail" alt={movie.title}></img>
                        <div className="buttons-wrapper">
                            <div className="d-flex justify-content-between buttons">
                                <button className="btn btnDetails me-1">Details</button>
                                <button className="btn btnToFavourites">To favourites</button>                         
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>        
    );
}


