import jwt from "jsonwebtoken";

export const generateAccessToken = (username: string): string => {
  return jwt.sign({ username: username }, process.env.TOKEN_SECRET as string, {
    expiresIn: "15m",
  });
};
