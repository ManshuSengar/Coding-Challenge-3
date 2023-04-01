const userService = require("../services/user-service");
const User=require('../models/user-model');

class UserController {
  async createUser(req, res) {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !email || !password) {
      res.status(400).json("Please Enter all the Feilds");
    }

    const userExists = await User.findOne({ email,deleted:false });
    if (userExists) {
      return res.status(400).json("User already exists");
    }
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        password: user.password,
        email: user.email,
      });
    } else {
     return res.status(400).json("User not found");
    }
  }

  async index(req, res) {
    const users = await userService.getAllUser();
    return res.json(users);
  }

  async show(req, res) {
    const user = await userService.getUser(req.params.userId);
    return res.json(user);
  }

   async update(req, res) {
    try {   
      const user = await userService.updateUser(req.params.userId,req.body);
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  };
   async delete(req, res) {
    try {   
      const user = await userService.deleteUser(req.params.userId,req.body);
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

module.exports = new UserController();
