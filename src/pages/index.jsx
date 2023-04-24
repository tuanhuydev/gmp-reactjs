import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/:movieId",
        element:<h1>Hello World</h1>
      }
    ]
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
