import React from "react";
import { IMovie } from "../interfaces/IMovie";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite} from "../redux/actions";

const IMAGE_URL = "http://image.tmdb.org/t/p/w342";

export const DetailsPage: React.FC = () => {
  const dispatch = useDispatch();

  const allMovies: IMovie[] = useSelector(
    (state: RootState) => state.movies.allMovies
  );

  const favourites: IMovie[] = useSelector(
    (state: RootState) => state.movies.favourites
  );

  const { id } = useParams();

  const movie = allMovies.find((movie) => movie.id === Number(id));

  const poster_url = IMAGE_URL + movie!.poster_path;
  
  const addToFavourites = async (movie: IMovie) => {
    await fetch("http://localhost:3000/favourites", {
      method: "POST",
      body: JSON.stringify({ 
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        popularity: movie.popularity,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
      }),
      headers: {
        "Content-Type":"application/json"
      }
    });   

    if(favourites.find(_movie=>_movie.id===movie.id)) return; 
    dispatch(addFavourite(movie));
}

  return (
    <>
      <div className="row">
        <div className="col text-center text-white py-5">
          <h1>{movie?.title}</h1>
        </div>
      </div>

      <div className="row min-vh-100 fst-italic">
        <div className="col-md-6">
          <img
            src={poster_url}
            className="img-thumbnail"
            alt={movie!.title}
          ></img>
        </div>
        <div className="col-md-6">
          <p className="text-white">{movie?.overview}</p>
          <h2 className="pt-5 text-warning">
            Rating: &nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="#ffc107"
              className="bi bi-star-fill"
              viewBox="0 0 16 20"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            &nbsp;
            <b>{movie?.vote_average}</b>
          </h2>
          <p className="pt-3">
            Vote count:&nbsp;<b>{movie?.vote_count}</b>
          </p>
          <p className="pt-3">
            Popularity:&nbsp;<b>{movie?.popularity}</b>
          </p>
          <p className="pt-3">
            Release date:&nbsp;<b>{movie?.release_date}</b>
          </p>
          <button
            className="btn btn-primary"
            onClick={() => addToFavourites(movie!)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-star"
              viewBox="0 0 16 20"
            >
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
            </svg>
            &nbsp;
            Add to favourites
          </button>
        </div>
      </div>

      {/* <button className="btn" onClick={()=>history.push("/")}>Back</button> */}
    </>
  );
};
