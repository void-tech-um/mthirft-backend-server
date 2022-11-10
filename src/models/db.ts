import dotenv from "dotenv";
import { Sequelize } from "sequelize";

//import Sequelize from "./db";
//import dotenv from "./db"; 

dotenv.config();

const dbName = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

/** @desc Create a new Sequelize instance */
const sequelize = new Sequelize(
  `postgres://${user}:${password}@${host}:5432/${dbName}`
);

/** @desc Test connection to database */
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err: any) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;