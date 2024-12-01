import jwt from "jsonwebtoken";
import { env } from "../env.js";

export function readToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET);
}

export function createToken(email: string) {
  return jwt.sign(
    {
      email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration,
    },
    env.JWT_SECRET,
  );
}
