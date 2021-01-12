import React from 'react';

interface Props {
   handleSubmit: any;
   onSubmit: any;
   register: any;
}

const  SearchForm: React.FC<Props> = ({ handleSubmit, onSubmit, register }) => {
   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="movieTitle"> Movie title
               <input 
                  type="text" 
                  id="movieTitle" 
                  name="movieTitle" 
                  ref={register} 
               />
            </label>
            <button type="submit">search</button>
         </form>      
      </>
   )
}

export default SearchForm;
