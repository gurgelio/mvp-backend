import { config } from "dotenv";
import { z } from "zod";

config();
if (process.env.NODE_ENV != null)
  config({ path: `.env.${process.env.NODE_ENV}` });

const envSchema = z.object({
  DATABASE_URL: z.string().default("file:./dev.db"),
  JWT_SECRET: z.string(),
  ENV: z.enum(["development", "test", "production"]).default("development"),
});

export const env = envSchema.parse(process.env);
