import React from 'react';

interface Props {
   handleSubmit: any;
   onSubmit: any;
   register: any;
   errors: any;
}

const  SearchForm: React.FC<Props> = ({ handleSubmit, onSubmit, register, errors }) => {
   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="movieTitle"> Movie title
               <input 
                  type="text" 
                  id="movieTitle" 
                  name="movieTitle" 
                  ref={register({ required: true })} 
               />
               <p className="error">{errors.movieTitle && "title require"}</p>
            </label>
            <button type="submit">search</button>
         </form>      
      </>
   )
}

export default SearchForm;
