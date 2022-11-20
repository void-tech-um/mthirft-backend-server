import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (
  req: any,
  res: any,
  next: any
): Promise<void> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  console.log(hashedPassword);
  req.body.password = hashedPassword;
  next();
};
