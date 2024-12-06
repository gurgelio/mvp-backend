import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStudents } from "@/services/students";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export function IndexStudents() {
  const { data, error, isPending } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  if (isPending) return <p>Carregando...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
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
    </>
  );
}
