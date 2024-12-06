import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { createAppointment } from "@/services/appointments";
import { getStudents } from "@/services/students";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newAppointmentSchema = z.object({
  time: z.date().min(new Date()),
  student_id: z.string(),
});

type NewAppointmentSchema = z.infer<typeof newAppointmentSchema>;

export function NewAppointment() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewAppointmentSchema>({
    resolver: zodResolver(newAppointmentSchema),
    defaultValues: {
      time: new Date(),
    },
  });

  const { data: students } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  const { mutateAsync } = useMutation({
    mutationFn: createAppointment,
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync(data);
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <main>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="time">Horário</Label>
          <Input
            type="datetime-local"
            {...register("time", { valueAsDate: true })}
          />
        </div>
        <div>
          <Label htmlFor="student_id">Consultor</Label>
          <Select {...register("student_id")}>
            {students?.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </Select>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Criar
        </Button>
      </form>
    </main>
  );
}
