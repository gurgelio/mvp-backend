import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/hooks/useUser";
import { getTeachers } from "@/services/teachers";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export function IndexTeachers() {
  const user = useUser();
  const { data, error, isPending } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });

  if (isPending) return <p>Carregando...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <main>
      <h1>Professores</h1>
      {user?.role === "admin" && (
        <Link
          to="/teachers/new"
          className="float-right -mt-10 text-primary font-bold"
        >
          Adicionar professor
        </Link>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((teacher) => (
            <TableRow key={teacher.id}>
              <TableCell>{teacher.name}</TableCell>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>{teacher.phone_number}</TableCell>
              <TableCell>
                <Link className="text-amber-700" to={`/teachers/${teacher.id}`}>
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
