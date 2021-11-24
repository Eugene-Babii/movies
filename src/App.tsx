import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import { Navbar } from "./components/Navbar";
import { AllMoviesPage}  from "./pages/AllMoviesPage";
import { DetailsPage } from "./pages/DetailsPage";
import { FavouritesMoviesPage } from "./pages/FavouritesMoviesPage";

const App: React.FC = () => {
    return (
    <BrowserRouter>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route element={<AllMoviesPage />} path="/"/>    
          <Route element={<FavouritesMoviesPage/>} path="/favourites"/>         
          <Route element={<DetailsPage/>} path="/details/:id" />   
          {/* <Route element={<AllMoviesPage/>} path="/pages/:page" />          */}

        </Routes>
      </div>
      </BrowserRouter>
 );
};

export default App;
