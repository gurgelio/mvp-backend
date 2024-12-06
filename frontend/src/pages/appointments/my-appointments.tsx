import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/hooks/useUser";
import { cancelAppointment, getMyAppointments } from "@/services/appointments";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";

export function MyAppointments() {
  const user = useUser();

  const { data, error, isPending } = useQuery({
    queryKey: ["appointments", "my"],
    queryFn: () => getMyAppointments(user!.id),
    enabled: user != null,
  });

  if (isPending) return <p>Carregando...</p>;
  if (error) return <p>Ocorreu um erro: {error.message}</p>;

  return (
    <main>
      <h1>Meus Horários</h1>
      <Table>
        <TableHeader className="text-left">
          <TableRow>
            <TableHead>Horário</TableHead>
            <TableHead>Consultor</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>
                {formatDate(appointment.time, "d/M/yy 'às' hh:mm")}
              </TableCell>
              <TableCell>{appointment.student.name}</TableCell>
              <TableCell>
                <Button
                  type="button"
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => cancelAppointment(appointment.id)}
                >
                  Cancelar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
