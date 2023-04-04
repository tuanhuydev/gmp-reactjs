import React from "react";
import styled from "styled-components";
import { EMPTY_STRING } from "../configs/constants";

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

export default function MovieDetails({
  movie: { image, name, genres = [], year, description, length = "" },
}) {
  return (
    <Container>
      <img src={image} width={300} height={500} alt="hello" />
      <div className="w-half">
        <Tile>{name}</Tile>
        <GenreList>
          {genres?.length
            ? genres.map((genre) => <GenreItem key={genre}>{genre}</GenreItem>)
            : EMPTY_STRING}
        </GenreList>
        <div className="flex gap-3">
          <SubTilePrimary>{year}</SubTilePrimary>
          <SubTilePrimary>{length}</SubTilePrimary>
        </div>
        <Description>{description}</Description>
      </div>
    </Container>
  );
}
