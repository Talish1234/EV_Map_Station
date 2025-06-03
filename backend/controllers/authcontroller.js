const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");

const signup = catchAsync(async (req, res) => {
  const { name, role , email, password } = req.body;

  if (!name || !email || !password || password.length < 8)
    return res.status(400).json({ message: "Please fill all fields" });
  const bcyptedPassword = await bcrypt.hash(password, 10);
  await User.create({
    name,
    email,
    password: bcyptedPassword,
    role,
  });
  return res.status(200).json({ message: "Signup successful"});
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Please fill all fields" });

  const user = await User.findOne({ email });
  if (!user || user.length === 0)
    return res.status(400).json({ message: "User not found" });
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(400).json({ message: "Invalid password" });
  
  const token = jwt.sign({userID:user._id,role:user.role}, process.env.SECRET, { expiresIn: 1000*60*60*24*30 });

  return res.cookie('token',token,{
        secure: true,
        sameSite: 'None',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30
  }).status(200).json({ message: "Login successful",data:{name:user.name,email:user.email, role:user.role}});
}
);

const logout = catchAsync(async (req, res) => {
    res.clearCookie("token").status(200).json({
        message: "Logout successfully"
    });
});

module.exports = { signup, login ,logout};