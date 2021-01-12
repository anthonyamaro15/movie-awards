import { MovieProps } from '../interfaces';
import Loader from './Loader';
import { apiKey } from '../envVariables';


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
                     <div className="list-wrapper">
                        {movies.map((movie: MovieProps) => (
                           <div className="single-movie" key={movie.imdbID}>
                              <img 
                                 src={`http://img.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`} 
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
                        ))}
                     </div>

                  </div>
               )}
            </div>
         )}
      </>
   )
}

export default DisplayMovies;
