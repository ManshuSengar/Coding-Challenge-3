const User=require('../models/user-model');
const bcrypt = require("bcryptjs");

class UserService{
    async getUser(userId) {
        const user = await User.findOne({ _id: userId });
        return user;
    }

    async getAllUser() {
        const users = await User.find({ deleted: false });
        return users;
    }

    async updateUser(userId,obj) {
        const user =await User.findByIdAndUpdate({ _id: userId },obj, { new: true });;
        return user;
    }
    async deleteUser(userId) {
        const user =await User.findByIdAndUpdate({ _id: userId },{deleted:true}, { new: true });;
        return user;
    }


}
exports.module=new UserService();