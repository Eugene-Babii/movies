import React from "react";
import {NavLink} from "react-router-dom";
import { IMovie } from "../interfaces/IMovie";
import { useSelector} from 'react-redux'
import { RootState } from "../redux/rootReducer";
import { Link } from "react-router-dom";

export const Navbar: React.FC=()=>{

  const favourites:IMovie[] = useSelector((state: RootState) => state.movies.favourites);

  return(
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container">
        <Link className="navbar-brand text-primary" to="/" >Movies</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">All</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link position-relative" to="/favourites">Favorites
                <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger">
                  {favourites.length}              
                  <span className="visually-hidden">favorites movies</span>
                </span>
              </NavLink>
            </li>        
        </ul>
        </div>
      </div>
    </nav>
    )
}