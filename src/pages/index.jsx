import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import ErrorBoundary from "../components/commons/ErrorRouting";
import MovieDetail from "../components/MovieDetails";
import AddNewMovie from "../components/AddNewMovie";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/:movieId",
        element: <MovieDetail />
      },
      {
        path: "/new",
        element: <AddNewMovie />
      }
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} fallbackElement={<ErrorBoundary />} />;

export default AppRouter;
