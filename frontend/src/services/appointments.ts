import { api } from "@/lib/axios";
import { User } from "./auth";
import type { Student } from "./students";

export interface Appointment {
  id: number;
  time: string;
  student: Student;
  user: User;
}

export async function getAppointments() {
  const response = await api.get<Appointment[]>("/appointments");

  return response.data;
}

export async function getMyAppointments(userId: number) {
  const response = await api.get<Appointment[]>(
    `/appointments?userId=${userId}`,
  );

  return response.data;
}

export async function makeAppointment(appointmentId: number) {
  const response = await api.patch(`/appointments/${appointmentId}/make`);

  return response.data;
}

export async function cancelAppointment(appointmentId: number) {
  const response = await api.delete(`/appointments/${appointmentId}/cancel`);

  return response.data;
}
