import { api } from "@/lib/axios";
import type { Teacher } from "./teachers";

export interface Student {
  name: string;
  email: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
  id: number;
  teacher: Teacher;
}

export async function getStudents() {
  return (await api.get<Student[]>("/students")).data;
}

export async function getStudent(id: string) {
  const response = await api.get<Student>(`/students/${id}`);

  return response.data;
}

interface UpdateStudentBody {
  name: string;
  email: string;
  phone_number: string;
}

export async function updateStudent(id: string, student: UpdateStudentBody) {
  await api.patch(`/students/${id}`, student);
}

interface CreateStudentBody {
  name: string;
  email: string;
  phone_number: string;
  teacher_id: string;
}

export async function createStudent(student: CreateStudentBody) {
  await api.post("/students", student);
}
