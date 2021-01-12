import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe("Renders App without crashing", () => {
   it('Renders App', () => {
      <App />
   });
});
