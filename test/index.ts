import { dbConn } from "../src/models/db";

// set database credentials

const dbName = "test";
const dbUser = "postgres";
const password = "test";
const host = "localhost";

// initialize database

const sequelize = dbConn(dbName, dbUser, password, host);

// import all models
