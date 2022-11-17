import { User, Message, Chat } from "./models";

export const getChats = async (username: string) => {
    const chats = await Chat.findAll({
        where: {
            senderId: username,
        },
    });
    return chats;
};


export const getUserMessages = async (user1: User, user2: User) => {
    const messages = await Message.findAll({
        where: {
            senderId: user1.username,
            recipientId: user2.username
        },
        order: [    
            ['createdAt', 'ASC']
        ]
    });
    return messages;
};

