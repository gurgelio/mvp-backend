import { createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "@/pages/auth/layout";
import { SignIn } from "@/pages/auth/sign-in";
import { SignUp } from "@/pages/auth/sign-up";
import { AppLayout } from "@/pages/layout";
import { IndexStudents } from "@/pages/students";
import { IndexAppointments } from "./pages/appointments";
import { MyAppointments } from "./pages/appointments/my-appointments";
import { NewAppointment } from "./pages/appointments/new";
import { NewStudent } from "./pages/students/new";
import { ShowStudent } from "./pages/students/show";
import { IndexTeachers } from "./pages/teachers";
import { NewTeacher } from "./pages/teachers/new";
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
          { path: "/new-appointment", element: <NewAppointment /> },
          { path: "/my-appointments", element: <MyAppointments /> },
          { path: "/students", element: <IndexStudents /> },
          { path: "/students/new", element: <NewStudent /> },
          { path: "/students/:id", element: <ShowStudent /> },
          { path: "/teachers", element: <IndexTeachers /> },
          { path: "/teachers/new", element: <NewTeacher /> },
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
