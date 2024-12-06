import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const signUpForm = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirmation: z.string().min(8),
  phone_number: z.string().min(10).max(15),
  name: z.string(),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  });

  const { mutateAsync } = useMutation({
    mutationFn: createUser,
  });

  const handleSignUp = handleSubmit(
    async (data) => {
      console.log("a");
      if (data.password != data.passwordConfirmation) {
        console.error("As senhas devem ser iguais!");
        return;
      }

      try {
        await mutateAsync(data);
        navigate("/");
      } catch {
        console.error("Erro ao cadastrar usuário.");
      }
    },
    (errors) => console.error(errors),
  );

  return (
    <div className="p-8">
      <Link
        className="text-primary text-lg absolute top-8 right-8 transition-colors hover:text-accent-foreground"
        to={"/sign-in"}
      >
        Fazer login
      </Link>
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-semibold text-2xl tracking-tight">Criar conta</h1>
          <p className="text-muted-foreground text-sm">
            Consiga sua consultoria fiscal!
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSignUp}>
          <div className="space-y-2">
            <Label htmlFor="name">Seu nome</Label>
            <Input id="name" type="text" {...register("name")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Seu email</Label>
            <Input id="email" type="email" {...register("email")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone_number">Seu celular</Label>
            <Input id="phone_number" type="tel" {...register("phone_number")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" {...register("password")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password-confirmation">Confirmar senha</Label>
            <Input
              id="password-confirmation"
              type="password"
              {...register("passwordConfirmation")}
            />
          </div>

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            Finalizar cadastro
          </Button>

          <p className="px-6 text-center text-muted-foreground text-sm/relaxed">
            Ao continuar, você concorda com nossos{" "}
            <a
              href="#terms-of-service"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              Termos de serviço
            </a>{" "}
            e{" "}
            <a
              href="#privacy-policy"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              políticas de privacidade
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
