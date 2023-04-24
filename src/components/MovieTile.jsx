import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { EMPTY_STRING } from "../commons/constants";

const Title = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 1.125rem;
  line-height: 1.2rem;
  font-weight: 500;
`;

const Wrapper = styled.div`
  max-width: 300px;
`;

const GenreList = styled.ul`
  min-height: 1rem;
  list-style-type: none;
  margin: 0;
  padding: 0;
  color: #fff;
`;

const GenreItem = styled.li`
  display: inline;
  font-size: 0.75rem;
  margin-right: 0.25rem;
`;

const Image = styled.img`
  min-width: 300;
  min-height: 500;
`

const Year = styled.span`
  border: 1px solid #fff;
  color: #fff;
  border-radius: 0.5rem;
  padding: 0.25rem;
`;

export default function MovieTile({ id, posterPath, title, releaseDate, genres, onClick }) {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <Wrapper className="cursor-pointer" onClick={handleClick} data-testid="tile-testid">
      <Image src={posterPath} width={300} height={500} alt={title} />
      <div className="flex items-center justify-between">
        <Title>{title}</Title>
        <Year>{releaseDate.slice(0, 4)}</Year>
      </div>
      <GenreList>
        {genres?.length
          ? genres.map((genre) => <GenreItem key={genre}>{genre}</GenreItem>)
          : EMPTY_STRING}
      </GenreList>
    </Wrapper>
  );
}

MovieTile.propTypes = {
  posterPath: PropTypes.string,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string),
};
