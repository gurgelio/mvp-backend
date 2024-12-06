import { createTeacher } from "@/services/teachers";
import { useNavigate } from "react-router-dom";
import { TeacherForm } from "./components/form";

export function NewTeacher() {
  const navigate = useNavigate();

  return (
    <main>
      <TeacherForm
        onSubmit={createTeacher}
        onSuccess={() => navigate("/teachers")}
      />
    </main>
  );
}
