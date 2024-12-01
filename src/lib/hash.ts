import { createHash } from "crypto";

export function digest(password: string) {
  return createHash("sha256").update(password).digest("base64");
}
