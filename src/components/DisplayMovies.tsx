import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { apiKey } from '../envVariables';
import { MovieProps } from '../interfaces';
import { addNewProperties, checkForNominations, updateMovieData } from '../helperFunctions';


const DisplayMovies = () => {
   const [search, setSearch] = useState('');
   const [movies, setMovies] = useState<MovieProps[]>([]);
   const [nominations, setNominations] = useState<MovieProps[]>([]);
   const [page, setPage] = useState(1);
   const { register, handleSubmit, watch } = useForm();

   const title = watch('movieTitle');

   useEffect(() => {
      setSearch(title);
   }, [title]);
   
   useEffect(() => {
      getCachedData();
   },[]);

   useEffect(() => {
      localStorage.setItem('nominations', JSON.stringify(nominations));
   },[nominations]);

   function getCachedData() {
      const cachedData = localStorage.getItem('nominations');
      if(cachedData) {
         setNominations(JSON.parse(cachedData));
      } 
   }

   const onSubmit = async (values: any) => {
      try {
         const { data } = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}&page=${page}`);
         const updatedData = addNewProperties(data.Search);
         const checkForNomination = checkForNominations(updatedData, nominations);
         setMovies(checkForNomination);
      } catch (error) {
         console.log(error);
      }
   }

   const addNominate = (movie: MovieProps) => {
      const updateData = updateMovieData(movies, movie);
      const saveNomitateUpdatedMovie = updateData.find((mov) => mov.imdbID === movie.imdbID) || movie;

      getCachedData();
      setNominations([...nominations, saveNomitateUpdatedMovie]);
      setMovies(updateData);
   }

   const removeNominate = (movie: MovieProps) => {
      const updateNominateData = nominations.filter((mov) => mov.imdbID !== movie.imdbID);
      
      if(movies.length) {
         const updateData = updateMovieData(movies, movie);
         setMovies(updateData);
      }
      setNominations(updateNominateData);
   }

   return (
      <div>
         <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="movieTitle">
               <input type="text" id="movieTitle" name="movieTitle" placeholder="title" ref={register} />
            </label>
            <button type="submit">search</button>
         </form>
         {movies.length && (
            <div>
               <h2>{`Results for "${search}"`}</h2>
               {movies.map((movie: MovieProps) => (
                  <div key={movie.imdbID}>
                     <ul>
                        <li>{movie.Title}</li>
                     </ul>
                     <button onClick={() => addNominate(movie)}>{movie.nominate ? "nominated" : 'nominate'}</button>
                  </div>
               ))}
               <ul>
                  <li></li>
               </ul>
            </div>
         )}
         <div>
            <h2>nominations</h2>
            {nominations.map((movie) => (
               <div key={movie.imdbID}>
                  <ul>
                     <li>{movie.Title}</li>
                  </ul>
                  <button onClick={() => removeNominate(movie)}>remove</button>
               </div>
            ))}
         </div>

      </div>
   )
}

export default DisplayMovies;
