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

interface updateTeacherBody {
  name: string;
  email: string;
  phone_number: string;
}

export async function updateTeacher(id: string, teacher: updateTeacherBody) {
  await api.patch(`/teachers/${id}`, teacher);
}
