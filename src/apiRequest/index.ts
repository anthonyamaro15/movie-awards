import axios from 'axios';
import { apiKey } from '../envVariables';

interface RequestProps {
   movieTitle: string;
   page: number;
}

export const getMoviesRequest = async (body: RequestProps) => {
   const {movieTitle, page} = body;
   return await axios
      .get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}&page=${page}`);
}
