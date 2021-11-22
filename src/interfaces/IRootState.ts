import { IMovie } from "./IMovie";

export interface IRootState {
    allMovies: IMovie[],
    favourites: IMovie[],
    totalPages: number,
    currentPage: number
  }