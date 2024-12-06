import { getTeacher, updateTeacher } from "@/services/teachers";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { TeacherForm } from "./components/form";

export function ShowTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isPending } = useQuery({
    queryKey: ["teachers", id],
    queryFn: () => getTeacher(id!), // id deve existir sempre
  });

  if (error) return <p>Ocorreu um erro: {error.message}</p>;
  if (isPending) return <p>Carregando...</p>;

  return (
    <main>
      <TeacherForm
        onSubmit={(data) => updateTeacher(id!, data)}
        defaultValues={data}
        onSuccess={() => navigate("/teachers")}
      />
    </main>
  );
}
