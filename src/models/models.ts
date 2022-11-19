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
    items: Association<User, Item>,
    senderMsgs: Association<User, Message>,
    recipientMsgs: Association<User, Message>
  };
}

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

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  /*
  get getOwner(): NonAttribute<User> {
    return this.owner;
  }
  */ 
}

export class Message extends Model<
  InferAttributes<Message>,
  InferCreationAttributes<Message>
> {
  declare messageId: CreationOptional<number>;
  declare message: string;
  declare senderId: ForeignKey<User["username"]>;
  declare recipientId: ForeignKey<User["username"]>;
  declare createdAt: CreationOptional<Date>;
}

export class Wishlist extends Model<
  InferAttributes<Wishlist>,
  InferCreationAttributes<Wishlist>
> {
  declare userId: ForeignKey<User["username"]>;
  declare itemId: ForeignKey<Item["itemId"]>;
}

export class Chat extends Model<
  InferAttributes<Chat>,
  InferCreationAttributes<Chat>
> {
  declare senderId: ForeignKey<User["username"]>;
  declare recipientId: ForeignKey<User["username"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Chat.init(
  {
    senderId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    recipientId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Chat",
    tableName: "chats",
  }
)


/** @desc Initialize User model */
User.init(
    {
        username: {
            type: DataTypes.STRING,
            primaryKey: true, 
        },
        fullName: {
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
    }
  },
  {
    sequelize,
    modelName: "Item",
    tableName: "items",
  }
);

/** @desc initialize Message model */
Message.init(
  {
    messageId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    updatedAt: false,
  }
);

/** @desc initialize Wishlist model */
Wishlist.init(
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    }, 
    itemId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true, 
    }
  },
  {
      sequelize,
      modelName: "Wishlist",
      tableName: "Wishlists",
  }
);


/** @desc Associations go here */

User.hasMany(Item, {
  foreignKey: "userId",
  sourceKey: "username",
  as: "items",
});

Item.belongsTo(User, {
  targetKey: "username",
});

User.hasMany(Message, { 
  foreignKey: "senderId",
  sourceKey: "username",
  as: "senderMsgs"
});

User.hasMany(Message, {
  foreignKey: "recipientId",
  sourceKey: "username",
  as: "recipientMsgs"
});

Message.belongsTo(User, {
  targetKey: "username"
});

User.belongsToMany(Item, {through: "Wishlist"});

Item.belongsToMany(User, {through: "Wishlist"});


