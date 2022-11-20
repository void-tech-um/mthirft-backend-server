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

export class User extends Model<
  InferAttributes<User, { omit: "items" }>,
  InferCreationAttributes<User, { omit: "items" }>
> {
  declare username: string;
  declare fullName: string;
  declare email: string;
  declare password: string;
  declare userBio: string;
  declare phoneNumber: string;
  declare userPhoto: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare items?: NonAttribute<Item[]>;

  declare static associations: {
    items: Association<User, Item>;
    senderMsgs: Association<User, Message>;
    recipientMsgs: Association<User, Message>;
  };
}

/** @desc Initialize User model */
User.init(
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
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
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export class Item extends Model<
  InferAttributes<Item, { omit: "owner" }>,
  InferCreationAttributes<Item, { omit: "owner" }>
> {
  declare itemId: CreationOptional<number>;
  declare name: string;
  declare price: number;
  declare username: ForeignKey<User["username"]>;
  declare itemPhotos: string[];
  declare owner?: NonAttribute<User>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  /*
  get getOwner(): NonAttribute<User> {
    return this.owner;
  }
  */
}

/** @desc Initialize Item model */
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
    itemPhotos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Item",
    tableName: "items",
  }
);

export class Message extends Model<
  InferAttributes<Message>,
  InferCreationAttributes<Message>
> {
  declare messageId: CreationOptional<number>;
  declare message: string;
  declare sender: ForeignKey<User["username"]>;
  declare recipient: ForeignKey<User["username"]>;
  declare createdAt: CreationOptional<Date>;
}

/** @desc initialize Message model */
Message.init(
  {
    messageId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Message",
    tableName: "messages",
    updatedAt: false,
  }
);

export class Wishlist extends Model<
  InferAttributes<Wishlist>,
  InferCreationAttributes<Wishlist>
> {
  declare username: ForeignKey<User["username"]>;
  declare itemId: ForeignKey<Item["itemId"]>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

/** @desc initialize Wishlist model */
Wishlist.init(
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    itemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Wishlist",
    tableName: "wishlist",
  }
);

export class Chat extends Model<
  InferAttributes<Chat>,
  InferCreationAttributes<Chat>
> {
  declare sender: ForeignKey<User["username"]>;
  declare recipient: ForeignKey<User["username"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Chat.init(
  {
    sender: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    recipient: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Chat",
    tableName: "chats",
  }
);

/** @desc Associations go here */

User.hasMany(Item, {
  foreignKey: "username",
  sourceKey: "username",
  as: "items",
});

// Item.belongsTo(User, {
//   targetKey: "username",
// });

User.hasMany(Message, {
  foreignKey: "sender",
  sourceKey: "username",
  as: "senderMsgs",
});

User.hasMany(Message, {
  foreignKey: "recipient",
  sourceKey: "username",
  as: "recipientMsgs",
});

Message.belongsTo(User, {
  targetKey: "username",
});

User.belongsToMany(Item, {
  through: Wishlist,
  sourceKey: "username",
  foreignKey: "username",
});

Item.belongsToMany(User, {
  through: Wishlist,
  sourceKey: "itemId",
  foreignKey: "itemId",
});
