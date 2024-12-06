import { api } from "@/lib/axios";
import type { Student } from "./students";

export interface Appointment {
  id: number;
  time: string;
  student: Student;
}

export async function getAppointments() {
  const response = await api.get<Appointment[]>("/appointments");
  console.log(response.data);
  return response.data;
}
