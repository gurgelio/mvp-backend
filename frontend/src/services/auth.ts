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

interface SignInResponse {
  token: string;
}

export async function signIn(body: SignInBody) {
  const response = await api.post<SignInResponse>("/auth/sessions", body);
  sessionStorage.setItem("@agenda_facil_naf/v1/token", response.data.token);
  api.defaults.headers.common["Authorization"] = response.data.token;
}

export async function signOut() {
  await api.delete("/auth/sessions");
}

export async function createUser({
  email,
  password,
  name,
  phone_number,
}: SignUpBody) {
  await api.post("/auth/registrations", {
    email,
    password,
    name,
    phone_number,
  });
}
