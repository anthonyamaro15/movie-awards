import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import DisplayMovies from '../DisplayMovies';
import { apiKey } from '../../envVariables';
import { getMoviesRequest } from '../../apiRequest';
import movies from '../../testData';

const addNominate = () => "";

const server = setupServer(
   rest.get(`https://www.omdbapi.com/?apikey=${apiKey}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(movies));
   })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Renders DisplayMovies without crashing", () => {
   it('Renders DisplayMovies', () => {
      render(
         <DisplayMovies
            loading={false}
            error={false}
            movies={[]}
            addNominate={addNominate}
            search={''}
         />
      )

   });
});

describe('Render DisplayMovies', () => {
   it('Displays loading meessage', () => {
      render(
         <DisplayMovies
            loading={true}
            error={false}
            movies={[]}
            addNominate={addNominate}
            search={'hulk'}
         />  
      );
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
   });

   it('Displays error message when no data is return', () => {
      render(
         <DisplayMovies
            loading={false}
            error={true}
            movies={[]}
            addNominate={addNominate}
            search={'fail'}
         />  
      );
      expect(screen.getByText(/no results found for "fail"/i)).toBeInTheDocument();
   })

   it('successfully fetch data', async ()  => {
      render(
         <DisplayMovies
            loading={false}
            error={false}
            movies={movies}
            addNominate={addNominate}
            search={'hulk'}
         />
      )

      const { data } = await getMoviesRequest({ movieTitle: "hulk", page: 1 });
      expect(data).toEqual(movies);
      expect(screen.getByText(/the incredible hulk/i)).toBeInTheDocument();
      expect(screen.getByText(/(2008)/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /nominate/i })).toBeInTheDocument();
   })
})
