import { sign } from "jsonwebtoken";
import { config } from "dotenv";
import { User } from "../db/user";
config();

export const generateUserJWT = (user: Partial<User>) => {
  const { password, ...safe } = user;
  return sign(safe, process.env.JWTSECRET as string, {
    expiresIn: "10h",
  });
};
