import { MovieProps } from '../interfaces';
import Loader from './Loader';


interface Props {
   movies: MovieProps[];
   addNominate: (movie: MovieProps) => void;
   search: string;
   loading: boolean;
   error: boolean;
}

const DisplayMovies: React.FC<Props> = ({ movies, addNominate, search, loading, error }) => {

   return (
      <>
         {error && <h1 className="api-error">{`no results found for "${search}"`}</h1>}
         {loading ? (
            <div className="loading">
               <h1>Loading</h1>
               <Loader />
            </div>
         ): (
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
                  </div>
               )}
            </div>
         )}
      </>
   )
}

export default DisplayMovies;
