import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const signInForm = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  });

  const { mutateAsync } = useMutation({
    mutationFn: signIn,
  });

  const handleSignIn = handleSubmit(async (data) => {
    try {
      await mutateAsync(data);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <div className="p-8">
      <Link
        to={"/sign-up"}
        className="text-primary text-lg absolute top-8 right-8 transition-colors hover:text-accent-foreground"
      >
        Crie uma conta
      </Link>
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-semibold text-2xl tracking-tight">Entrar</h1>
          <p className="text-muted-foreground text-sm">
            Consiga sua consultoria fiscal!
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSignIn}>
          <div className="space-y-2">
            <Label htmlFor="email">Seu email</Label>
            <Input id="email" type="email" {...register("email")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" {...register("password")} />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
