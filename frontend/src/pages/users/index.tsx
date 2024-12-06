import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsers } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export function IndexUsers() {
  const { data, error, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isPending) return <p>Carregando...</p>;
  if (error) return <p>Ocorreu um erro: {error.message}</p>;
  return (
    <>
      <h1>Usuários</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Tipo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone_number}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
