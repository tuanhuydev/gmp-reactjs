import { render, screen } from '@testing-library/react';
import MovieForm from '../components/Modal/MovieForm';
import React from 'react';
import MockProvider from './mocks/mockProvider';

describe('Add movie form test suits', function () {
  it('The Component should load', async function () {
    render(
      <MockProvider>
        <MovieForm open={true} />
      </MockProvider>
    );
    expect(await screen.findByTestId('add-movie-testid')).toBeInTheDocument();
  });
});
