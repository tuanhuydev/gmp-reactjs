import PropTypes from "prop-types";
import React from "react";
import styled from 'styled-components';

const Title = styled.h3`
  margin: 0;
`;

const Wrapper = styled.div`
  width: 400px;
  height: 500px;
`;
export default function MovieTile({ image, name, year, genres }) {
  return (
    <Wrapper>
      <img src={image} width={300} height={500} alt={name} />
      <div className="flex items-center justify-between">
        <Title>{name}</Title>
        <span>{year}</span>
      </div>
      <ul>{genres?.length ? genres.map((genre) => <li>{genre}</li>) : ""}</ul>
    </Wrapper>
  );
}

MovieTile.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string),
};
