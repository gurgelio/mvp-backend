import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getTeacher, updateTeacher } from "@/services/teachers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

const updateTeacherSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone_number: z.string().min(10).max(15),
});

type UpdateTeacherForm = z.infer<typeof updateTeacherSchema>;

export function ShowTeacher() {
  const { id } = useParams();
  const client = useQueryClient();

  const { data, error, isPending } = useQuery({
    queryKey: ["teachers", id],
    queryFn: () => getTeacher(id!), // id deve existir sempre
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<UpdateTeacherForm>({
    resolver: zodResolver(updateTeacherSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: (data: UpdateTeacherForm) => updateTeacher(id!, data),
    onSuccess: () => client.invalidateQueries({ queryKey: ["teachers"] }),
  });

  const handleUpdate = handleSubmit(async (data) => {
    try {
      await mutateAsync(data);
    } catch (err) {
      console.error(err);
    }
  });

  useEffect(() => {
    if (data != null)
      reset(data, {
        keepDirtyValues: true,
      });
  }, [data]);

  if (error) return <p>Ocorreu um erro: {error.message}</p>;
  if (isPending) return <p>Carregando...</p>;

  return (
    <main>
      <form onSubmit={handleUpdate} className="space-y-4">
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
        <Button type="submit" disabled={isSubmitting}>
          Salvar
        </Button>
      </form>
    </main>
  );
}
