import React from 'react';
import { MovieProps } from '../interfaces';
import backupImg from '../imgs/backup.jpg';

interface Props {
   movie: MovieProps;
   addNominate: (movie: MovieProps) => void;
}

const SingleMovie: React.FC<Props> = ({ movie, addNominate }) => {
   return (
      <div className="single-movie">
         <img 
            src={movie.Poster === 'N/A' ? backupImg : movie.Poster} 
            alt="movie poster"
         />
         <ul>
            <li><span>Title:</span>{`${movie.Title}`}</li>
            <li><span>Released Year:</span>{`(${movie.Year})`}</li>
         </ul>
         <button
            className={movie.nominate ? "disabled-button" : ""} 
            disabled={movie.nominate} 
            onClick={() => addNominate(movie)}
         >{movie.nominate ? "nominated" : 'nominate'}
         </button>
      </div>
   )
}

export default SingleMovie;
