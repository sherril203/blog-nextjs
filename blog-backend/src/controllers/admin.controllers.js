const {adminModel}=require('../models/admin.model')
const bcrypt=require('bcrypt')
const tokengenerator= require('../middleware/Auth')
const adminRegister = async (req, res) => {
  try {
    const userData = req.body;

    const existData = await adminModel.findOne({ email: userData.email });
    if (existData) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new adminModel({
      ...userData,
      password: hashedPassword,
    });

    await newUser.save(); 

    res.status(201).json({ message: "Admin registered" });

  } catch (error) {
    console.log("ADMIN REGISTER ERROR:", error);
    res.status(500).json({
      message: "Register failed",
      error: error.message
    });
  }
};
const AdminLogin=async(req,res)=>{
  try {
    const { email, password } = req.body;
console.log(req.body)
    const existData = await adminModel.findOne({ email });
    if (!existData) {
      return res.status(404).json({ message: "You are not registered" });
    }

    const matchedPassword = await bcrypt.compare(password, existData.password);
    if (!matchedPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = tokengenerator(existData._id);

    // ✅ Just return the stored userId
    return res.status(200).json({
      message: "admin login successfully",
      data: {
        token,
        user: {
          id: existData._id,
          username: existData.username,
          email: existData.email
        }
      }
    });

  } catch (err) {
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
}
module.exports={adminRegister,AdminLogin}