import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().default("http://localhost:3000"),
  MODE: z.enum(["production", "development", "test"]).default("development"),
});

export const env = envSchema.parse(import.meta.env);
