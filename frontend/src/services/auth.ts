import { api } from "@/lib/axios";

export interface SignInBody {
  email: string;
  password: string;
}

interface SignUpBody {
  email: string;
  password: string;
  name: string;
  phone_number: string;
}

export async function signIn(body: SignInBody) {
  const response = await api.post("/auth/sign_in", { user: body });
  sessionStorage.setItem(
    "@agenda_facil_naf/v1/user",
    JSON.stringify(response.data),
  );
}

export async function signOut() {
  await api.post("/sign-out");
}

export async function createUser({
  email,
  password,
  name,
  phone_number,
}: SignUpBody) {
  await api.post("/auth", { user: { email, password, name, phone_number } });
}
