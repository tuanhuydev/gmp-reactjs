import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import ErrorBoundary from '../components/commons/ErrorRouting';
import MovieDetail from '../components/MovieDetails';
import MovieModal from './MovieModal';
import movieService from '../services/MovieService';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/:movieId',
        element: <MovieDetail />,
        loader: async ({ params }) => movieService.fetchMovie(params.movieId),
        children: [
          {
            path: '/:movieId/edit',
            loader: async ({ params }) => movieService.fetchMovie(params.movieId),
            element: <MovieModal />,
          },
        ],
      },
      {
        path: '/new',
        element: <MovieModal />,
      },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} fallbackElement={<ErrorBoundary />} />;

export default AppRouter;
