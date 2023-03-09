import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Dashboard } from "./Dashboard";
import { Login } from "./Login";
import { PageNotFound } from "./PageNotFound";
import { Register } from "./Register";

const token = localStorage.getItem("token");

const router = createBrowserRouter([
  {
    path: "/dashboard",
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
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/",
    element: token ? <Dashboard /> : <Login />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
