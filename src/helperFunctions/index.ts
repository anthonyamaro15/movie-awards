import { MovieProps } from "../interfaces";

export function addNewProperties(data: MovieProps[]) {
   return data.map((movie) => {
      return {
         ...movie,
         nominate: false
      };
   })
}

export function checkForNominations(movie: MovieProps[], nominations: MovieProps[]) {
   for(let i = 0; i < movie.length; i++) {
      for(let j = 0; j < nominations.length; j++) {
         if(nominations[j]) {
            if(nominations[j].imdbID === movie[i].imdbID) {
               movie[i].nominate = nominations[j].nominate;
            }
         }
      }
   }
   return movie;
}


export function updateMovieData(movies: MovieProps[], movie: MovieProps) {
   return movies.map((mov) => {
      if(mov.imdbID === movie.imdbID) {
         return {
            ...mov,
            nominate: !mov.nominate
         }
      }
      return mov;
   });
}
