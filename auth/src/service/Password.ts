import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(candidatePassword: string): Promise<string> {
    const salt = randomBytes(8).toString("hex");
    const crypticPassword = (await scryptAsync(
      candidatePassword,
      salt,
      64
    )) as Buffer;
    return `${crypticPassword.toString("hex")}.${salt}`;
  }

  static async compare(
    oldCrypticPassword: string,
    newPassword: string
  ): Promise<boolean> {
    const [crypticPassword, salt] = oldCrypticPassword.split(".");
    const newCrypticPassword = (await scryptAsync(
      newPassword,
      salt,
      64
    )) as Buffer;
    return crypticPassword === newCrypticPassword.toString("hex")
      ? true
      : false;
  }
}
