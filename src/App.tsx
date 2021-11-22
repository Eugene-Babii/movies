import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import { Navbar } from "./components/Navbar";
import { AllMoviesPage}  from "./pages/AllMoviesPage";
import { DetailsPage } from "./pages/DetailsPage";
import { FavouritesMoviesPage } from "./pages/FavouritesMoviesPage";
import { IMovie } from "./interfaces/IMovie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/rootReducer";




const App: React.FC = () => {

  const allMovies: IMovie[] = useSelector(
    (state: RootState) => state.movies.allMovies
  );
    return (
    <BrowserRouter>
      {/* <Navbar countFavourites={favourites.length}/> */}
      <Navbar/>
      <div className="container">
        <Routes>
          <Route element={<AllMoviesPage />} path="/"/>    
          <Route element={<FavouritesMoviesPage/>} path="/favourites"/>         
          {/* <Route element={<DetailsPage movie={movie}/>}  path="/details/:id"/>     */}
          <Route element={<DetailsPage path="/details/:id" />} />            
          {/* <Route path="/details/:id" component={match => (
            <DetailsPage movie={allMovies.find(movie => String(movie.id) === String(match.params.id))} />
  )} */}
        </Routes>
      </div>
      </BrowserRouter>
 );
};

export default App;
