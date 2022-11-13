import sequelize from "./db";
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  Association,
  ForeignKey,
} from "sequelize";

/** @desc Initialize User model */
export class User extends Model<
  InferAttributes<User, { omit: "items" }>,
  InferCreationAttributes<User, { omit: "items" }>
> {
  declare username: string;
  declare email: string;
  declare password: string;
  declare userBio: string;
  declare phoneNumber: string;
  declare userPhoto: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;


  declare items?: NonAttribute<Item[]>;

  declare static associations: { items: Association<User, Item> };
}

/** @desc Initialize Item model */
export class Item extends Model<
  InferAttributes<Item>,
  InferCreationAttributes<Item>
> {
  declare itemId: CreationOptional<number>;
  declare name: string;
  declare price: number;
  declare userId: ForeignKey<User["username"]>;
  declare itemPhotos: string[];
  declare owner?: NonAttribute<User>;
  declare postDate: CreationOptional<Date>;
}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            primaryKey: true, 
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userBio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userPhoto: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        }
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
    }
);

Item.init(
  {
    itemId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postDate:{
      type: DataTypes.DATE,
      allowNull: false,
    },
    itemPhotos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "Item",
    tableName: "items",
    createdAt: false,
    updatedAt: false,
  }
);
User.hasMany(Item, {
  foreignKey: "userId",
  sourceKey: "username",
  as: "items",
});

Item.belongsTo(User, {
  targetKey: "username",
});