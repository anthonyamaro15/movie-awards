import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { apiKey } from '../envVariables';


const DisplayMovies = () => {
   const [search, setSearch] = useState('');
   const [page, setPage] = useState(1);
   const { register, handleSubmit, watch } = useForm();

   const title = watch('movieTitle');

   useEffect(() => {
      setSearch(title);
   }, [title]);


   const onSubmit = async (values: any) => {
      try {
         const { data } = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}&page=${page}`);
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div>
         <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="movieTitle">
               <input type="text" id="movieTitle" name="movieTitle" placeholder="title" ref={register} />
            </label>
            <button type="submit">search</button>
         </form>
      </div>
   )
}

export default DisplayMovies;
