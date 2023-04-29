import React, { useCallback, useContext, useEffect, useState } from 'react';
import { EMPTY_STRING, SORT_BY_OPTIONS } from '../commons/constants/global';
import styled from 'styled-components';
import SearchMovie from '../components/SearchMovie';
import HeaderBackground from '../assets/images/header_background.png';
import { Page } from '../styles/styled/page';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import Select from '../components/commons/Select';
import { StoreContext } from '../configs/store/context';
import Toast from '../components/Modal/Toast';
import MovieList from '../components/MovieList';
import withDeeplink from '../components/hocs/WithDeeplink';
import movieService from '../services/MovieService';
import { Outlet, useNavigate } from 'react-router-dom';
import { scrollTop0 } from '../utils/domHelpers';
import PropTypes from 'prop-types';

function Home({ search, setSearchParams }) {
  // Context
  const { showToast } = useContext(StoreContext);

  // State
  const [movieState, setMovieState] = useState({
    movies: [],
    limit: 0,
    offset: 0,
    totalAmount: 0,
    selected: null,
  });
  const [movieFilter, setMovieFilter] = useState({
    search: EMPTY_STRING,
    searchBy: 'title',
    sortBy: '',
    sortOrder: 'desc',
  });

  // Hooks
  const navigate = useNavigate();

  const movieFilterHandler = useCallback(
    (state) => (prevState) => ({
      ...prevState,
      ...state,
    }),
    []
  );

  const fetchMovies = useCallback(async (filter) => {
    const movieState = await movieService.fetchMovies(filter);
    setMovieState((prevState) => ({
      ...prevState,
      ...movieState,
    }));
  }, []);

  // Filter handlers
  const setSearch = useCallback(
    (search) => {
      setMovieFilter(movieFilterHandler({ search }));
      setSearchParams({ search });
    },
    [movieFilterHandler, setSearchParams]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  const changeSortBy = (option) => setMovieFilter(movieFilterHandler({ sortBy: option.value }));

  const selectMovie = (selectedMovie) => {
    scrollTop0();
    navigate(`/${selectedMovie.id}`);
  };

  const addMovie = () => navigate('/new');

  useEffect(() => {
    fetchMovies(movieFilter);
  }, [fetchMovies, movieFilter]);

  useEffect(() => {
    if (search) {
      setMovieFilter(movieFilterHandler({ search }));
    }
  }, [movieFilterHandler, search]);

  // filter no change yet
  const { selected, movies } = movieState;

  return (
    <Page>
      <Header>
        <div className="flex justify-between py-3">
          <Logo />
          {!selected && <AddButton onClick={addMovie}>+ Add Movie</AddButton>}
        </div>
        <SearchMovie onChange={setSearch} value={movieFilter.search} onSearch={handleSearch} />
      </Header>
      <div className="px-7">
        <div className="flex items-center">
          <TotalAmount>
            <b>{movieState.totalAmount}</b> movies found
          </TotalAmount>
          <div className="ml-auto w-one-fourth flex items-center"></div>
          <label htmlFor="" className="upper mr-3 text-light">
            sort by
          </label>
          <div className="py-3 px-3 grow">
            <Select options={SORT_BY_OPTIONS} value={SORT_BY_OPTIONS[0].value} onSelect={changeSortBy} />
          </div>
        </div>
        <Outlet />
        <MovieList movies={movies} onSelect={selectMovie} />
      </div>
      <Footer />
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
  background-image: url('${HeaderBackground}');
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

const TotalAmount = styled.div`
  color: var(--light);
  font-size: 1.5rem;
`;

Home.propTypes = {
  search: PropTypes.string,
  setSearchParams: PropTypes.func,
};

export default withDeeplink(Home);
