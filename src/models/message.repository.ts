import { User, Message, Chat } from "./models";

export const getChats = async (username: string) => {
  const chats = await Chat.findAll({
    where: {
      sender: username,
    },
  });
  return chats;
};

export const getUserMessages = async (user1: User, user2: User) => {
  const messages = await Message.findAll({
    where: {
      sender: user1.username,
      recipient: user2.username,
    },
    order: [["createdAt", "ASC"]],
  });
  return messages;
};
