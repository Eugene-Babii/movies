import React, { useState, useEffect, useRef } from "react";
import { IMovie } from "../interfaces/IMovie";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, getMovies, setCurrent, incrementCurrentPage, clearMovies } from "../redux/actions";
import { RootState } from "../redux/rootReducer";

const IMAGE_URL = "http://image.tmdb.org/t/p/w342";

export const AllMoviesPage: React.FC = () => {
  const dispatch = useDispatch();
  const allMovies: IMovie[] = useSelector(
    (state: RootState) => state.movies.allMovies
  );
  const favourites: IMovie[] = useSelector(
    (state: RootState) => state.movies.favourites
  );
  let totalPages: number = useSelector(
    (state: RootState) => state.movies.totalPages
  );
  let currentPage: number = useSelector(
    (state: RootState) => state.movies.currentPage
  );

  // const [movies, setMovies] = useState<IMovie[]>([]);
  // const [favourites, setFavourites] = useState<IMovie[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const refCurrentPage = useRef(1);

//   useEffect(()=>{
    // let savedCurrentPage = JSON.parse(localStorage.getItem("currentPage")||"1") as number;
    // refCurrentPage.current = savedCurrentPage;
    // let savedFavourites = JSON.parse(localStorage.getItem("favourites")||"[]") as IMovie[];
  //   savedFavourites.map((f)=>addFavourites(f))
  //   favourites.concat(savedFavourites);
// }, []);

    // useEffect(() => {
    //     let savedCurrentPage = JSON.parse(localStorage.getItem("currentPage")||"1") as number;
    //     refCurrentPage.current = savedCurrentPage;;   
    // }, []);


  useEffect(() => {
    if (fetching) {
      console.log("fetching");
      try {
        dispatch(getMovies(refCurrentPage.current));
        // dispatch(incrementCurrentPage());
        refCurrentPage.current++;
        // localStorage.setItem("currentPage", JSON.stringify(refCurrentPage.current));

      } finally {
        setFetching(false);
      }
    }
  }, [fetching, totalPages, dispatch]);

    // useEffect(()=>{
        
    // }, [currentPage])

    // useEffect(()=>{
    //     localStorage.setItem("favourites", JSON.stringify(favourites));
    // }, [favourites])



  // const addFavourites = (id: number)=>{
  //   const newMovie: IMovie={
  //     id: id
  //   }
  //   setFavourites(prev=>[newMovie, ...prev])
  // }

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

  const addToFavourites = (_movie: IMovie) => {
      if(favourites.find(movie=>movie===_movie)) return; 
      dispatch(addFavourite(_movie));
  }

  // async const agetToMovies = (page: number) => {
  //     await getMovies(page);
  // }

  return (
    <>
      <h1 className="text-white text-center p-4">All popular movies</h1>
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
              <div className="buttons-wrapper">
                <div className="d-flex justify-content-between buttons">
                  <button className="btn btnDetails me-1">Details</button>
                  

                  <button
                    className="btn btnAddFavourites"
                    onClick={() => addToFavourites(movie)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-star"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg>
                  </button>
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
