import React from "react";
import styled from "styled-components";
import { EMPTY_STRING } from "../commons/constants";

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



export default function MovieDetails({movie: { id, posterPath, title, releaseDate, tagline, genres, overview, onClick }}) {
  return (
    <Container>
        <img src={posterPath} width={300} height={500} alt={title} />
      <div className="w-half">
        <Tile>{title}</Tile>
        <GenreList>{genres?.length ? genres.map((genre) => <GenreItem key={genre}>{genre}</GenreItem>) : EMPTY_STRING}</GenreList>
        <div className="flex gap-3">
          <SubTilePrimary>{releaseDate}</SubTilePrimary>
          <SubTilePrimary>{tagline}</SubTilePrimary>
        </div>
        <Description>{overview}</Description>
      </div>
    </Container>
  );
}
