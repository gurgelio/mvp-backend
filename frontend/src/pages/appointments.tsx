import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAppointments } from "@/services/appointments";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";

export function Appointments() {
  const { data, error, isPending } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  if (isPending) return <p>Carregando...</p>;
  if (error) return <p>Ocorreu um erro: {error.message}</p>;

  return (
    <>
      <h1>Horários</h1>
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
                {formatDate(appointment.time, "d/M/yy às hh:mm")}
              </TableCell>
              <TableCell>{appointment.student.name}</TableCell>
              <TableCell>
                <Button type="button">Marcar horário</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
