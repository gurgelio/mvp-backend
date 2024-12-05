import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./layouts/app";
import { AuthLayout } from "./layouts/auth";
import { Home } from "./pages/home";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";
import { Students } from "./pages/students";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/students", element: <Students /> },
        ],
      },
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "/sign-in",
            element: <SignIn />,
          },
          {
            path: "/sign-up",
            element: <SignUp />,
          },
        ],
      },
    ],
  },
]);
