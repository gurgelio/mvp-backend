import { api } from "@/lib/axios";
import type { Teacher } from "./teachers";

export interface Student {
  name: string;
  email: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
  id: number;
  teacher_id: number;
  teacher: Teacher;
}

export async function getStudents() {
  return (await api.get<Student[]>("/students")).data;
}
