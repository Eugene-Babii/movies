import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavourites, removeFavourite } from "../redux/actions";
import { IMovie } from "../interfaces/IMovie";
import { RootState } from "../redux/rootReducer";

const IMAGE_URL = "http://image.tmdb.org/t/p/w342";

export const FavouritesMoviesPage: React.FC = () => {
  const dispatch = useDispatch();
  const favourites: IMovie[] = useSelector(
    (state: RootState) => state.movies.favourites
  );

  useEffect(()=>{
    fetch("http://localhost:3000/favourites")
    .then(response => response.json())        
    .then(data => dispatch(setFavourites(data)))
  },[dispatch])

  const removeFromFavourites=(id:number)=>{
    fetch(`http://localhost:3000/favourites/${id}`,{
      method: "DELETE"
    });
    
    dispatch(removeFavourite(id));
  }

  return (
    <div className="min-vh-100">
      <h1 className="text-white text-center p-4">Favourites movies</h1>
      <div className="row g-3 pb-5 ">
        {favourites.map((movie) => {
          const poster_url = IMAGE_URL + movie.poster_path;
          return (
            <div
              className="col-sm-6 col-md-4 col-lg-3 text-center relative"
              key={movie.id}
            >
              <img
                src={poster_url}
                className="img-thumbnail"
                alt={movie.title}
              ></img>
              <div className="buttons-wrapper">
                <div className="d-grid gap-2 buttons">
                  <button
                    className="btn btnRemoveFavourites"
                    onClick={() => removeFromFavourites(movie.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
