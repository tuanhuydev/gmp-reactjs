import React, { useContext } from "react";
import MovieTile from "../components/MovieTile";
import { EMPTY_STRING, MOCK_TILES } from "../configs/constants";
import styled from "styled-components";
import SearchMovie from "../components/SearchMovie";
import HeaderBackground from "../assets/images/header_background.png";
import { Page } from "../styles/styled/page";
import { useState } from "react";
import MovieDetails from "../components/MovieDetails";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Select from "../components/form/Select";
import { DispatchContext, StoreContext } from "../configs/store/context";
import MovieForm from "../components/Modal/MovieForm";
import Toast from "../components/Modal/Toast";

const Tiles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 2rem 0;
`;
const Header = styled.header`
  background-image: url("${HeaderBackground}");
  height: 300px;
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const AddButton = styled.button`
  color: var(--primary);
  background-color: #606060;
  text-transform: uppercase;
  padding: 1rem 2rem;
  border-radius: 0.25rem;
`;

export default function Home() {
  // State
  const [search, setSearch] = useState(EMPTY_STRING);
  const [selectedMovie, setMovie] = useState(null);

  // Context
  const { showModal, showToast } = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);

  const handleSearch = (event) => {};

  const selectMovie = (id) => {
    const movie = MOCK_TILES.find((tile) => tile.id === id);
    if (movie) {
      setMovie(movie);
    }
  };
  const selectCategory = (value) => {
    // console.log(value);
  };

  const addMovie = () => {
    dispatch({ type: "toggleModal", showModal: !showModal });
  };

  return (
    <Page>
      <Header>
        <div className="flex justify-between py-3">
          <Logo />
          {!selectedMovie && (
            <AddButton onClick={addMovie}>+ Add Movie</AddButton>
          )}
        </div>
        <SearchMovie
          onChange={setSearch}
          value={search}
          onSearch={handleSearch}
        />
      </Header>
      <div className="px-7">
        <div className="py-3 px-3 w-one-third ml-auto">
          <Select
            options={["All", "Category"]}
            value={["All"]}
            onSelect={selectCategory}
          />
        </div>
        {selectedMovie && <MovieDetails movie={selectedMovie} />}
        <Tiles>
          {MOCK_TILES.map((tile) => (
            <MovieTile key={tile.name} {...tile} onClick={selectMovie} />
          ))}
        </Tiles>
      </div>
      <Footer />
      <MovieForm open={showModal} />
      <Toast
        open={showToast}
        title="congratulations !"
        description="The movie has been added to
database successfully "
      />
    </Page>
  );
}
