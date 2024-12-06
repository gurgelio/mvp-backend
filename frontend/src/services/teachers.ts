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
  return (await api.get<Teacher[]>("/teachers")).data;
}

export async function getTeacher(id: string) {
  const response = await api.get<Teacher>(`/teachers/${id}`);

  return response.data;
}

interface UpdateTeacherBody {
  name: string;
  email: string;
  phone_number: string;
}

export async function updateTeacher(id: string, teacher: UpdateTeacherBody) {
  await api.patch(`/teachers/${id}`, teacher);
}

interface CreateTeacherBody {
  name: string;
  email: string;
  phone_number: string;
}

export async function createTeacher(teacher: CreateTeacherBody) {
  await api.post("/teachers", teacher);
}
