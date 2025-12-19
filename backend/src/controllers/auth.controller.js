const userModel = require("../modals/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const foodPartnerModel = require("../modals/foodpartner.model.js");

async function registerUser(req, res) {
  console.log("🚀 ~ registerUser ~ registerUser:");
  const { fullName, email, password } = req.body;
  console.log("🚀 ~ registerUser ~ req.body:", req.body);
  const isUserExists = await userModel.findOne({ email });

  if (isUserExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in Successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

async function logout(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
}

async function registerFoodPartner(req, res) {
  const { name, email, password } = req.body;
  const isAccountExists = await foodPartnerModel.findOne({ email });

  if (isAccountExists) {
    return res.status(400).json({
      message: "Food partner account already exists.",
    });
  }

  const hashPass = await bcrypt.hash(password, 10);
  const foorPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashPass,
  });

  const token = jwt.sign({ id: foodPartnerModel._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.status(201).json({
    message: "Food partner redistered successfully",
    foodPartner: {
      _id: foorPartner._id,
      email: foorPartner.email,
      name: foorPartner.name,
    },
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;
  const user = await foodPartnerModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign({ id: foodPartnerModel._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(200).json({
    message: "Food partner logged in Successfully",
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
  });
}

function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Food Partner logged out successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logout,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
