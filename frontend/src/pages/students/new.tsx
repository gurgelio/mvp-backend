import { createStudent } from "@/services/students";
import { useNavigate } from "react-router-dom";
import { StudentForm } from "./components/form";

export function NewStudent() {
  const navigate = useNavigate();
  return (
    <main>
      <StudentForm
        onSubmit={createStudent}
        onSuccess={() => navigate("/students")}
      />
    </main>
  );
}
