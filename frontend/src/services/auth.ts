import { api } from "@/lib/axios";

export interface User {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  role: string;
}

export async function me() {
  const response = await api.get<User>("/auth/me");
  return response.data;
}

export interface SignInBody {
  email: string;
  password: string;
}

export async function signIn(body: SignInBody) {
  const response = await api.post<{ token: string }>("/auth/sessions", body);
  sessionStorage.setItem("@agenda_facil_naf/v1/token", response.data.token);
  api.defaults.headers.common["Authorization"] = response.data.token;
}

interface SignUpBody {
  email: string;
  password: string;
  name: string;
  phone_number: string;
}

export async function createUser({
  email,
  password,
  name,
  phone_number,
}: SignUpBody) {
  await api.post<{ user: User; token: string }>("/auth/registrations", {
    email,
    password,
    name,
    phone_number,
  });
}

export async function getUsers() {
  const response = await api.get<User[]>("/auth/registrations");

  return response.data;
}
