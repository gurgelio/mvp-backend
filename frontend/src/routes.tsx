import { createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "@/pages/auth/layout";
import { SignIn } from "@/pages/auth/sign-in";
import { SignUp } from "@/pages/auth/sign-up";
import { AppLayout } from "@/pages/layout";
import { Students } from "@/pages/students";
import { Appointments } from "./pages/appointments";
import { MyAppointments } from "./pages/my-appointments";
import { Users } from "./pages/users";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { path: "/", element: <Appointments /> },
          { path: "/students", element: <Students /> },
          { path: "/my-appointments", element: <MyAppointments /> },
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
