import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { getTeachers } from "@/services/teachers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface StudentFormProps {
  defaultValues?: UpdateStudentSchema;
  onSubmit: (data: UpdateStudentSchema) => Promise<unknown>;
  onSuccess?: () => void;
}

const updateStudentSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone_number: z.string().min(10).max(15),
  teacher_id: z.string(),
});

type UpdateStudentSchema = z.infer<typeof updateStudentSchema>;

export function StudentForm({
  defaultValues,
  onSubmit,
  onSuccess,
}: StudentFormProps) {
  const client = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<UpdateStudentSchema>({
    resolver: zodResolver(updateStudentSchema),
  });

  const { data: teachers, error } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });

  const { mutateAsync } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["students"] });
      onSuccess != null && onSuccess();
    },
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync(data);
    } catch (err) {
      console.error(err);
    }
  });

  useEffect(() => {
    if (defaultValues != null)
      reset(defaultValues, {
        keepDirtyValues: true,
      });
  }, [defaultValues]);

  if (error) return <p>Ocorreu um erro: {error.message}</p>;

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input type="text" id="name" {...register("name")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" {...register("email")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone_number">Telefone</Label>
        <Input type="text" id="phone_number" {...register("phone_number")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="teacher_id">Supervisor</Label>
        <Select {...register("teacher_id")} id="teacher_id">
          {teachers?.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </Select>
      </div>
      <Button type="submit" disabled={isSubmitting}>
        Salvar
      </Button>
    </form>
  );
}
