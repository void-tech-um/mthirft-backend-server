import { Sequelize } from "sequelize";
import dotenv from "dotenv";

/** @desc Create a new Sequelize instance */

export const dbConn = (
  dbName: string,
  user: string,
  password: string,
  host: string
) => {
  const sequelize = new Sequelize(
    `postgres://${user}:${password}@${host}:5432/${dbName}`
  );

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

  return sequelize;
};

dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const sequelize = dbConn(
  dbName as string,
  dbUser as string,
  password as string,
  host as string
);

export default sequelize;
