import { api } from "@/lib/axios";
import { Teacher } from "./teachers";

interface Student {
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
  return (await api.get("/students")).data as Student[];
}
