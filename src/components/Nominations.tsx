import React from 'react';
import { MovieProps } from '../interfaces';

interface Props {
   nominations: MovieProps[];
   removeNominate: (movie: MovieProps) => void;
   movies: MovieProps[];
}
const Nominations: React.FC<Props> = ({ nominations, removeNominate, movies }) => {
   return (
      <div className={movies.length || nominations.length ? "Nominations" : ""}>
         {movies.length > 0 && (
            <h2>{movies.length && nominations.length === 0 ? "nomination list empty" : "nominations"}</h2>
         )}
         {nominations.map((movie) => (
            <div className="list-wrapper" key={movie.imdbID}>
               <ul>
                  <li>{`${movie.Title} (${movie.Year})`}</li>
               </ul>
               <button onClick={() => removeNominate(movie)}>remove</button>
            </div>
         ))}
      </div>
   )
}

export default Nominations;
