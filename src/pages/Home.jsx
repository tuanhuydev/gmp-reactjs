import React from "react";
import MovieTile from "../components/MovieTile";
import { MOCK_TILES } from "../configs/constants";
import styled from 'styled-components';

const Tiles = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function Home() {
  return (
    <Tiles>
      {MOCK_TILES.map((tile) => (
        <MovieTile key={tile.name} {...tile} />
      ))}
    </Tiles>
  );
}
