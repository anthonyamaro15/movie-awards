import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchForm from '../SearchForm';

const handleSubmit = () => null;
const onSubmit = () => null;
const register = () => null;
const errors = {};

describe("Renders without crashing", () => {
   it("Renders SearchForm", () => {
      render(
         <SearchForm 
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
         />
      );
   });

   it('Displays movie input', () => {
      render(
         <SearchForm 
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
         />
      );
      
      expect(screen.getByRole('textbox', { name: /movie title/i})).toBeInTheDocument();
   })
});
