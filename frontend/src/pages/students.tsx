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

export function Students() {
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.phone_number}</TableCell>
              <TableCell>
                <Link to={`/teacher/${student.teacher_id}`}>
                  {student.teacher.name}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
