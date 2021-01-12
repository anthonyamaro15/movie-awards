import { addNewProperties, checkForNominations } from '..';
import movies from '../../testData';

const originalMovieVersion = [
   {
      Poster: "https://m.media-amazon.com/images/M/MV5BMTUyNzk3MjA1OF5BMl5BanBnXkFtZTcwMTE1Njg2MQ@@._V1_SX300.jpg",
      Title: "The Incredible Hulk",
      Year: "2008",
      imdbID: "tt0800080",
   }
];

const nominations = [
   {
      Poster: "https://m.media-amazon.com/images/M/MV5BMTUyNzk3MjA1OF5BMl5BanBnXkFtZTcwMTE1Njg2MQ@@._V1_SX300.jpg",
      Title: "The Incredible Hulk",
      Year: "2008",
      imdbID: "tt0800080",
      nominate: true
   }
];


describe("test helper functions", () => {
   it("add new property to data", () => {
      const updateMovie = addNewProperties(originalMovieVersion);
      expect(updateMovie).toEqual(movies);
   });

   it('check for nominations and updated api data', () => {
      const updateApiMovieData = checkForNominations(movies, nominations);
      const sameValuse = checkForNominations(movies, movies);

      expect(updateApiMovieData).toEqual(nominations);
      expect(sameValuse).toEqual(movies);
   });
});

