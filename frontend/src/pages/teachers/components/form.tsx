import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface TeacherFormProps {
  defaultValues?: UpdateTeacherSchema;
  onSubmit: (data: UpdateTeacherSchema) => Promise<unknown>;
  onSuccess?: () => void;
}

const updateTeacherSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone_number: z.string().min(10).max(15),
});

type UpdateTeacherSchema = z.infer<typeof updateTeacherSchema>;

export function TeacherForm({
  onSubmit,
  defaultValues,
  onSuccess,
}: TeacherFormProps) {
  const client = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<UpdateTeacherSchema>({
    resolver: zodResolver(updateTeacherSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["teachers"] });
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
      <Button type="submit" disabled={isSubmitting}>
        Salvar
      </Button>
    </form>
  );
}
