import { createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "@/pages/auth/layout";
import { SignIn } from "@/pages/auth/sign-in";
import { SignUp } from "@/pages/auth/sign-up";
import { AppLayout } from "@/pages/layout";
import { IndexStudents } from "@/pages/students";
import { IndexAppointments } from "./pages/appointments";
import { MyAppointments } from "./pages/appointments/my-appointments";
import { ShowStudent } from "./pages/students/show";
import { IndexTeachers } from "./pages/teachers";
import { ShowTeacher } from "./pages/teachers/show";
import { IndexUsers } from "./pages/users";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { path: "/", element: <IndexAppointments /> },
          { path: "/my-appointments", element: <MyAppointments /> },
          { path: "/students", element: <IndexStudents /> },
          { path: "/students/:id", element: <ShowStudent /> },
          { path: "/teachers", element: <IndexTeachers /> },
          { path: "/teachers/:id", element: <ShowTeacher /> },
          { path: "/users", element: <IndexUsers /> },
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
