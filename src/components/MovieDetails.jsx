import React, { memo } from 'react';
import styled from 'styled-components';
import { EMPTY_STRING } from '../commons/constants/global';
import { Outlet, useLoaderData } from 'react-router-dom';

export default memo(function MovieDetail() {
  // Hooks
  const movie = useLoaderData();

  const { posterPath, title, genres = [], releaseDate, tagline, overview } = movie;

  return (
    <>
      {movie && (
        <Container>
          <img src={posterPath} width={300} height={500} alt={title} />
          <div className="w-half">
            <Tile>{title}</Tile>
            <GenreList>
              {genres?.length ? genres.map((genre) => <GenreItem key={genre}>{genre}</GenreItem>) : EMPTY_STRING}
            </GenreList>
            <div className="flex gap-3">
              <SubTilePrimary>{releaseDate}</SubTilePrimary>
              <SubTilePrimary>{tagline}</SubTilePrimary>
            </div>
            <Description>{overview}</Description>
          </div>
        </Container>
      )}
      <Outlet />
    </>
  );
});

const Description = styled.p`
  color: var(--light);
`;

const Tile = styled(Description)`
  font-size: 40px;
`;

const SubTilePrimary = styled.h3`
  color: var(--primary);
`;

const GenreList = styled.ul`
  margin: 0;
  padding: 0;
`;

const GenreItem = styled.li`
  list-style-type: none;
  color: var(--light);
`;

const Container = styled.div`
  display: flex;
  gap: 3rem;
`;
