import { Sequelize } from "sequelize";
import sequelize from "./db";

import * as user from "./user.repository";
import * as item from "./item.repository";

sequelize.sync();

const db = {
  sequelize,
  Sequelize,
  user,
  item,
};

export default db;