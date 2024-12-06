import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTeachers } from "@/services/teachers";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export function IndexTeachers() {
  const { data, error, isPending } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
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
    </>
  );
}
