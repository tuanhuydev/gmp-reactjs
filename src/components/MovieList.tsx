import React from 'react';
import styled from 'styled-components';
import MovieTile from './MovieTile';
import PropTypes from 'prop-types';

export default function MovieList({ movies = [], onSelect }: any) {
  const handleSelect = (movie: any) => () => {
    onSelect(movie);
  };

  return (
    <Tiles>
      {movies.map((movie: any) => (
        <MovieTile key={`${movie.title}-${Math.random()}`} {...movie} onClick={handleSelect(movie)} />
      ))}
    </Tiles>
  );
}

const Tiles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 2rem 0;
`;

MovieList.propTypes = {
  movies: PropTypes.array,
  onSelect: PropTypes.func,
};
