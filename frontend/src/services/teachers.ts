import { api } from "@/lib/axios";

export interface Teacher {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
}

export async function getTeachers() {
  return (await api.get("/teachers")).data as Teacher[];
}
