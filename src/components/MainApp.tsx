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

const MainApp = () => {
   const [search, setSearch] = useState('');
   const [movies, setMovies] = useState<MovieProps[]>([]);
   const [nominations, setNominations] = useState<MovieProps[]>([]);
   const [page, setPage] = useState(1);
   const [hasNominations, setHasNominations] = useState(false);
   const { register, handleSubmit, watch } = useForm();

   const title = watch('movieTitle');

   useEffect(() => {
      setSearch(title);
   }, [title]);
   
   useEffect(() => {
      getCachedData();
   },[]);

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

   const onSubmit = async (values: any) => {
      try {
         const { data } = await axios
            .get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}&page=${page}`);
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
         {hasNominations && (
            <h1>User has 5 nominations!!</h1>
         )}
         <SearchForm 
            onSubmit={onSubmit} 
            handleSubmit={handleSubmit} 
            register={register} 
         />
         <DisplayMovies 
            movies={movies} 
            addNominate={addNominate} 
            search={search} 
         />
         <Nominations nominations={nominations} removeNominate={removeNominate} />
      </div>
   )
}

export default MainApp;
