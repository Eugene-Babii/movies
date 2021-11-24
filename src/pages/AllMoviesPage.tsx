import React, { useState, useEffect, useRef } from "react";
import { IMovie } from "../interfaces/IMovie";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovies,
  setFavourites,
} from "../redux/actions";
import { RootState } from "../redux/rootReducer";
import { Link } from "react-router-dom";

const IMAGE_URL = "http://image.tmdb.org/t/p/w342";

export const AllMoviesPage: React.FC = () => {
  const dispatch = useDispatch();
  const allMovies: IMovie[] = useSelector(
    (state: RootState) => state.movies.allMovies
  );
  let totalPages: number = useSelector(
    (state: RootState) => state.movies.totalPages
  );

  const [fetching, setFetching] = useState<boolean>(true);
  const refCurrentPage = useRef(1);

  useEffect(() => {
    fetch("http://localhost:3000/favourites")
    .then(response => response.json())        
    .then(data => dispatch(setFavourites(data)))
  }, [dispatch]);

  useEffect(() => {    
    if (fetching) {
      console.log("fetching");
      try {
        dispatch(getMovies(refCurrentPage.current));
        refCurrentPage.current++;
      } finally {
        setFetching(false);
      }
    }
  }, [fetching]);

  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
      //  && refCurrentPage.current < totalPages
    ) {
      setFetching(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <>
      <h1 className="text-white text-center p-4">All popular movies</h1>
      {/* <nav className="d-flex justify-content-center pt-3 sticky-top" aria-label="...">
        <ul className="pagination">
          <li className="page-item">
            <Link className="page-link" to={`/pages/${refCurrentPage.current-1}`}>Previous</Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to={`/pages/${refCurrentPage.current-1}`}>
              {refCurrentPage.current-1}
            </Link>
          </li>
          <li className="page-item active" aria-current="page">
            <Link className="page-link" to="#">
            {refCurrentPage.current}
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to={`/pages/${refCurrentPage.current+1}`}>
              {refCurrentPage.current+1}
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to={`/pages/${refCurrentPage.current+1}`}>
              Next
            </Link>
          </li>
        </ul>
      </nav> */}

      <div className="row g-3">
        {allMovies.map((movie) => {
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
              <div className="">
                <div className="d-grid gap-2 buttons">
                  <Link
                    className="btn btn-outline-primary btn-lg"
                    to={`/details/${movie.id}`}
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// const mapStateToProps=(state: { movies: { movies: any; favourites: any; }; })=>{
//     return{
//         allMovies: state.movies.movies,
//         favourites: state.movies.favourites
//     }
// }

// const mapDispatchToProps={
//     addFavourite,
//     getMovies
// }

// export default connect(null, null)(AllMoviesPage);
