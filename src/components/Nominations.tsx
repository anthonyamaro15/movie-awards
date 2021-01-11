import React from 'react';
import { MovieProps } from '../interfaces';

interface Props {
   nominations: MovieProps[];
   removeNominate: (movie: MovieProps) => void;
}
const Nominations: React.FC<Props> = ({ nominations, removeNominate }) => {
   return (
      <div>
         {nominations.length > 0 && <h2>nominations</h2>}
         {nominations.map((movie) => (
            <div key={movie.imdbID}>
               <ul>
                  <li>{movie.Title}</li>
               </ul>
               <button onClick={() => removeNominate(movie)}>remove</button>
            </div>
         ))}
      </div>
   )
}

export default Nominations;
