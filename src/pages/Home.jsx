import React, { useCallback, useContext, useEffect } from "react";
import { EMPTY_STRING, SORT_BY_OPTIONS } from "../commons/constants";
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
import MovieList from "../components/MovieList";
import { movieAdapter } from "../utils/movieHelpers";
import { useParams } from "react-router-dom";

export default function Home() {
  // Context
  const { showModal, showToast } = useContext(StoreContext);

  // State
  const [movieState, setMovieState] = useState({
    movies: [],
    selected: null,
  });
  const [movieFilter, setMovieFilter] = useState({
    search: EMPTY_STRING,
    searchBy: "title",
    sortBy: "",
    sortOrder: "desc",
  });

  // Hooks
  const dispatch = useContext(DispatchContext);
  const { movieId } = useParams();
  console.log(movieId);

  const fetchMovies = useCallback(async (filter) => {
    let url = new URL("http://localhost:4000/movies");
    const fetchOptions = {};
    if (filter) {
      url = `${url}?${new URLSearchParams(filter)}`;
    }
    const response = await fetch(url, fetchOptions);
    const { data } = await response.json();
    const movies = data?.length ? movieAdapter(data) : [];
    console.log(movies);
    setMovieState((prevState) => ({ ...prevState, movies }));
  }, []);

  const setSearch = useCallback((search) => {
    setMovieFilter((filter) => ({ ...filter, search }));
  }, []);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      fetchMovies(movieFilter);
    },
    [fetchMovies, movieFilter]
  );

  const changeSortBy = (value) => {
    setMovieFilter((prevState) => ({ ...prevState, sortBy: value }));
  };

  const addMovie = useCallback(() => {
    dispatch({ type: "toggleModal", showModal: !showModal });
  }, [dispatch, showModal]);

  const selectMovie = (selectedMovie) => {
    const movieToUpdate = movies.find((movie) => movie.id === selectedMovie.id);
    if (movieToUpdate) {
      setMovieState((prevState) => ({ ...prevState, selected: movieToUpdate }));
    }
  };

  // Effects
  useEffect(() => {
    const timmer = setTimeout(() => {
      fetchMovies(movieFilter);
    }, 700);
    return () => {
      clearTimeout(timmer);
    };
  }, [fetchMovies, movieFilter]);

  useEffect(() => {
    if (movieId && movieState.movies) {
      const selectedMovie = movieState.movies.find(
        (movie) => movie.id === Number(movieId)
      );
      console.log({ selectedMovie });
      if (selectedMovie) {
        setMovieState((prevState) => ({
          ...prevState,
          selected: selectedMovie,
        }));
      }
    }
  }, [movieId, movieState.movies]);

  const { selected, movies } = movieState;

  return (
    <Page>
      <Header>
        <div className="flex justify-between py-3">
          <Logo />
          {!selected && <AddButton onClick={addMovie}>+ Add Movie</AddButton>}
        </div>
        <SearchMovie
          onChange={setSearch}
          value={movieFilter.search}
          onSearch={handleSearch}
        />
      </Header>
      <div className="px-7">
        <div className="ml-auto w-one-fourth flex items-center">
          <label htmlFor="" className="upper mr-3 text-light">
            sort by
          </label>
          <div className="py-3 px-3 grow">
            <Select
              options={SORT_BY_OPTIONS}
              value={SORT_BY_OPTIONS[0].value}
              onSelect={changeSortBy}
            />
          </div>
        </div>
        {selected && <MovieDetails movie={selected} />}
        <MovieList movies={movies} onSelect={selectMovie} />
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
