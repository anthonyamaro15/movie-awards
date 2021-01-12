import React from 'react';
import { apiKey } from '../envVariables';
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
         <div className="list-wrapper">
            {nominations.map((movie) => (
               <div className="single-movie" key={movie.imdbID}>
                  <img 
                     src={`http://img.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`} 
                     alt="movie poster"
                  />
                  <ul>
                     <li><span>Title:</span>{`${movie.Title}`}</li>
                     <li><span>Released Year:</span>{`(${movie.Year})`}</li>
                  </ul>
                  <button onClick={() => removeNominate(movie)}>remove</button>
               </div>
            ))}
         </div>
      </div>
   )
}

export default Nominations;
