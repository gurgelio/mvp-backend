import { getStudent, updateStudent } from "@/services/students";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { StudentForm } from "./components/form";

export function ShowStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isPending } = useQuery({
    queryKey: ["students", id],
    queryFn: () => getStudent(id!), // id deve existir sempre
  });

  if (error) return <p>Ocorreu um erro: {error.message}</p>;
  if (isPending) return <p>Carregando...</p>;

  return (
    <main>
      <StudentForm
        defaultValues={{ ...data, teacher_id: data.teacher.id.toString() }}
        onSubmit={(data) => updateStudent(id!, data)}
        onSuccess={() => navigate("/students")}
      />
    </main>
  );
}
