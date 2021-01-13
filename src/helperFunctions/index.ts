import { MovieProps } from "../interfaces";

// adds nominate property to data
export function addNewProperties(data: MovieProps[]) {
   return data.map((movie) => {
      return {
         ...movie,
         nominate: false,
      };
   })
}

// this method updated data coming from api if we have data in local storage then 
// we compare and if we have a match we update nominate value to whaevever localstorage 
// nomination value is
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

// this method toggles movies, either add or remove movies from results and nominations lists
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
