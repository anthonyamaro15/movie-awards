import { MovieProps } from '../interfaces';

interface Props {
   movies: MovieProps[];
   addNominate: (movie: MovieProps) => void;
   search: string;
}

const DisplayMovies: React.FC<Props> = ({ movies, addNominate, search }) => {

   return (
      <div className={movies.length ? "DisplayMovies" : ""}>
         {movies.length > 0 && (
            <div>
               <h2>{`Results for "${search}"`}</h2>
               {movies.map((movie: MovieProps) => (
                  <div className="list-wrapper" key={movie.imdbID}>
                     <ul>
                        <li>{`${movie.Title} (${movie.Year})`}</li>
                     </ul>
                     <button
                        className={movie.nominate ? "disabled-button" : ""} 
                        disabled={movie.nominate} 
                        onClick={() => addNominate(movie)}
                     >{movie.nominate ? "nominated" : 'nominate'}
                     </button>
                  </div>
               ))}
               <ul>
                  <li></li>
               </ul>
            </div>
         )}
      </div>
   )
}

export default DisplayMovies;
