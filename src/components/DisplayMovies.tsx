import { MovieProps } from '../interfaces';
import Loader from './Loader';
import SingleMovie from './SingleMovie';

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
                           <SingleMovie 
                              key={movie.imdbID} 
                              movie={movie} 
                              addNominate={addNominate} 
                           />
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
