import { createBrowserRouter } from "react-router-dom";

import { Appointments } from "@/pages/appointments";
import { AuthLayout } from "@/pages/auth/layout";
import { SignIn } from "@/pages/auth/sign-in";
import { SignUp } from "@/pages/auth/sign-up";
import { Home } from "@/pages/home";
import { AppLayout } from "@/pages/layout";
import { Students } from "@/pages/students";
import { Users } from "./pages/users";

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
          { path: "/appointments", element: <Appointments /> },
          { path: "/users", element: <Users /> },
        ],
      },
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          { path: "/sign-in", element: <SignIn /> },
          { path: "/sign-up", element: <SignUp /> },
        ],
      },
    ],
  },
]);
