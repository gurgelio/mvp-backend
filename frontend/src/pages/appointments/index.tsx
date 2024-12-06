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
import {
  cancelAppointment,
  getAppointments,
  makeAppointment,
} from "@/services/appointments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "date-fns";

export function IndexAppointments() {
  const client = useQueryClient();
  const user = useUser();
  const { data, error, isPending } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  const { mutate: makeAppointmentMutation } = useMutation({
    mutationFn: makeAppointment,
    onSuccess: () => client.invalidateQueries({ queryKey: ["appointments"] }),
  });

  const { mutate: cancelAppointmentMutation } = useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => client.invalidateQueries({ queryKey: ["appointments"] }),
  });

  if (isPending) return <p>Carregando...</p>;
  if (error) return <p>Ocorreu um erro: {error.message}</p>;

  return (
    <>
      <h1>Horários Disponíveis</h1>
      <Table>
        <TableHeader className="text-left">
          <TableRow>
            <TableHead>Horário</TableHead>
            <TableHead>Consultor</TableHead>
            <TableHead>Status</TableHead>
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
                {appointment.user == null ? (
                  <strong className="text-accent-foreground">Disponível</strong>
                ) : (
                  <strong className="text-amber-600">
                    Reservado para {appointment.user.name}
                  </strong>
                )}
              </TableCell>
              <TableCell className="flex items-center gap-4">
                <Button
                  type="button"
                  onClick={() => makeAppointmentMutation(appointment.id)}
                  disabled={appointment.user != null}
                >
                  Marcar horário
                </Button>
                {user?.role === "admin" && (
                  <Button
                    type="button"
                    onClick={() => cancelAppointmentMutation(appointment.id)}
                    disabled={appointment.user == null}
                    className="bg-red-500 hover:bg-red-700"
                  >
                    Desmarcar horário
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
