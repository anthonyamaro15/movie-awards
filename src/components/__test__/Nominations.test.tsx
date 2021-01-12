import React from 'react';
import { screen, render } from '@testing-library/react';
import Nominations from '../Nominations';
import movies from '../../testData';

const removeNominate = () => null;

describe("Renders Nomination component without crashing", () => {
   it('Render Nominations', () => {
      render(
         <Nominations 
            movies={[]} 
            nominations={[]} 
            removeNominate={removeNominate} 
         />
      );
   });
});

describe("Renders Nomination movie data", () => {
   it("Displays nomination movie data", () => {
      render(
         <Nominations 
            movies={movies} 
            nominations={movies} 
            removeNominate={removeNominate} 
         />
      );

      expect(screen.getByText(/nominations/i)).toBeInTheDocument();
      expect(screen.getByText(/the incredible hulk/i)).toBeInTheDocument();
      expect(screen.getByText(/(2008)/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
   });
});
