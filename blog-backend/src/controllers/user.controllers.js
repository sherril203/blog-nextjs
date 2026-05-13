const { userModel } = require('../models/user.model');
const bcrypt = require('bcrypt');
const tokengenerator = require('../middleware/Auth');

const UserRegister = async (req, res) => {
  try {
    const userData = req.body;

    const existData = await userModel.findOne({ email: userData.email });
    if (existData) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const userId = generateUserId();

    const newUser = new userModel({
      ...userData,
      password: hashedPassword,
      userId,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered" });

  } catch (error) {
    res.status(500).json({ message: "Register failed", error: error.message });
  }
};

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existData = await userModel.findOne({ email });
    if (!existData) {
      return res.status(404).json({ message: "You are not registered" });
    }

    const matchedPassword = await bcrypt.compare(password, existData.password);
    if (!matchedPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = tokengenerator(existData._id);

    return res.status(200).json({
      message: "User login successfully",
      data: {
        token,
        user: {
          id: existData._id,
          userId: existData.userId,
          username: existData.username,
          email: existData.email
        }
      }
    });

  } catch (err) {
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
};

module.exports = { UserRegister, UserLogin };