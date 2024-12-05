import axios from "axios";
import { env } from "./env";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

api.defaults.headers.common["Authorization"] =
  sessionStorage.getItem("@agenda_facil_naf/v1/token") || "";
