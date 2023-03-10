import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Dashboard } from "./Dashboard";
import GlobalContext from "../contexts";
import { Login } from "./Login";
import { PageNotFound } from "./PageNotFound";
import Recovery from "./Recovery";
import { Register } from "./Register";
import Reset from "./Reset";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/recovery",
    element: <Recovery />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
