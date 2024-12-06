import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/hooks/useUser";
import { getStudents } from "@/services/students";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export function IndexStudents() {
  const user = useUser();
  const { data, error, isPending } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  if (isPending) return <p>Carregando...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <main>
      <h1>Alunos</h1>
      {user?.role === "admin" && (
        <Link
          to="/students/new"
          className="float-right -mt-10 text-primary font-bold"
        >
          Adicionar aluno
        </Link>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Professor</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.phone_number}</TableCell>
              <TableCell>
                <Link
                  to={`/teachers/${student.teacher.id}`}
                  className="text-primary"
                >
                  {student.teacher.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link className="text-amber-700" to={`/students/${student.id}`}>
                  Editar
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
