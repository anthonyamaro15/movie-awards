import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiKey } from '../envVariables';
import { 
   addNewProperties, 
   checkForNominations, 
   updateMovieData 
} from '../helperFunctions';
import { MovieProps } from '../interfaces';
import DisplayMovies from './DisplayMovies';
import Nominations from './Nominations';
import SearchForm from './SearchForm';


interface SearchProps {
   movieTitle: string;
}

const MainApp = () => {
   const [search, setSearch] = useState('');
   const [movies, setMovies] = useState<MovieProps[]>([]);
   const [nominations, setNominations] = useState<MovieProps[]>([]);
   const [page, setPage] = useState(1);
   const [hasNominations, setHasNominations] = useState(false);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const { register, handleSubmit, reset, errors } = useForm();
   
   useEffect(() => {
      getCachedData();
   },[]);

   useEffect(() => {
      if(error) {
         setMovies([]);
      }
   },[error]);

   useEffect(() => {
      if(nominations.length === 5) {
         setHasNominations(true);
         setTimeout(() => {
            setHasNominations(false);
         }, 4000);
      }
   }, [nominations])

   useEffect(() => {
      localStorage.setItem('nominations', JSON.stringify(nominations));
   },[nominations]);

   function getCachedData() {
      const cachedData = localStorage.getItem('nominations');
      if(cachedData) {
         setNominations(JSON.parse(cachedData));
      } 
   }

   const onSubmit = async (values: SearchProps) => {
      setSearch(values.movieTitle);
      setError(false);
      setLoading(true);
      try {
         const { data } = await axios
            .get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${values.movieTitle}&page=${page}`);
         const updatedData = addNewProperties(data.Search);
         const checkForNomination = checkForNominations(updatedData, nominations);
         setMovies(checkForNomination);
         setLoading(false);
         setError(false);
         reset();
      } catch (error) {
         console.log(error);
         setError(true);
         setLoading(false);
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
      <div className="MainApp">
         <h1>nominate movies</h1>
         {hasNominations && (
            <h1 className="banner">User has 5 nominations!!</h1>
         )}
         <SearchForm 
            onSubmit={onSubmit} 
            handleSubmit={handleSubmit} 
            register={register} 
            errors={errors}
         />
         <div className="result-wrapper">
            <DisplayMovies
               loading={loading}
               error={error}
               movies={movies} 
               addNominate={addNominate} 
               search={search} 
            />
            <Nominations
               movies={movies}
               nominations={nominations} 
               removeNominate={removeNominate} 
            />
         </div>
      </div>
   )
}

export default MainApp;
