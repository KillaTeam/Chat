const roomModel = require("../models/room-model");
const userModel = require("../models/user-model");

class ChatService {
  async getUserId(email) {
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return undefined;
      }
      return user._id;
    } catch (err) {
      console.log(err);
    }
  }
  async getUserByEmail(email) {
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return undefined;
      }
      return user;
    } catch (err) {
      console.log(err);
    }
  }
  async getUserIdByName(name) {
    try {
      const user = await userModel.findOne({ name });
      if (!user) {
        return undefined;
      }
      return user._id;
    } catch (err) {
      console.log(err);
    }
  }
  async getUserBySocketId(socketId) {
    try {
      const user = await userModel.findOne({ socketId });
      if (!user) {
        return undefined;
      }
      return user;
    } catch (err) {
      console.log(err);
    }
  }
  async getSocketIdByName(name) {
    try {
      const user = await userModel.findOne({ name });
      if (!user) {
        return undefined;
      }
      return user.socketId;
    } catch (err) {
      console.log(err);
    }
  }
  async getAllOnlineUsers() {
    try {
      const users = await userModel.find({ isOnline: true });
      if (users) {
        return users;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async createPrivateRoom(email, name) {
    try {
      const userId1 = await this.getUserId(email);
      const userId2 = await this.getUserIdByName(name);
      const room = await roomModel.find({
        $and: [
          { users: { $elemMatch: { userId: userId1 } } },
          { users: { $elemMatch: { userId: userId2 } } },
        ],
      });
      if (room[0]) {
        return room[0];
      }
      const user1 = await userModel.findById(userId1);
      const user2 = await userModel.findById(userId2);
      const newRoom = await roomModel.create({
        users: [{ userId: user1.id }, { userId: user2.id }],
      });
      return newRoom.chat;
    } catch (err) {
      console.log(err);
    }
  }
  async addMessage(data) {
    try {
      const userId1 = await this.getUserId(data.name);
      const userId2 = await this.getUserIdByName(data.to);
      const room = await roomModel.findOne({
        $and: [
          { users: { $elemMatch: { userId: userId1 } } },
          { users: { $elemMatch: { userId: userId2 } } },
        ],
      });
      if (!room) {
        console.log("error");
      }
      room.chat.push({
        message: {
          text: data.text,
          name: data.name,
          id: data.id,
          socketId: data.socketId,
        },
      });
      await room.save();
      return room;
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = new ChatService();