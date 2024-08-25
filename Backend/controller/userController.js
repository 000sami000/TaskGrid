const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const errorHandler = require("../utils/error");
const signUp = async (req, res, next) => {
  const { email, name, password, confirmpassword } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !confirmpassword ||
    name === "" ||
    email === "" ||
    password === "" ||
    confirmpassword === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return next(errorHandler(400, "User already exists"));
    }
    if (password !== confirmpassword) {
      return next(errorHandler(400, "Password did't match"));
    }
    const hashedpassword = await bcrypt.hash(password, 12);
    const newUser = new userModel({ name, email, password: hashedpassword });
    await newUser.save();
    res.status(200).json({ message: "Sign up Successfull" });
  } catch (err) {

    return next(errorHandler(400, err._message));
  }
};
const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {

      return next(errorHandler(400, "User already exists"));
    }

    if (existingUser && existingUser.isblock) {


      return next(errorHandler(400, "This user in blocked"));
    }
    const ispasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!ispasswordCorrect) {
      return next(errorHandler(400, "invalid credentials"));
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    let option = {
      expires: new Date(Date.now() + 60 * 60 * 12000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
    };

    res.status(200).cookie("access_token", token, option).json({
      name: existingUser.name,
      email: existingUser.email,
      username: existingUser.username,
      access_token: token,
    });
  } catch (err) {
 
    res.status(404).json({ message: err });
  }
};

const signOut = (req, res) => {
  res.clearCookie("access_token", {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true, // Ensure this matches how the cookie was set
    sameSite: "none", // Ensure this matches how the cookie was set
    path: "/",
  });
  res.status(200).json({ message: "Cookie cleared and user logged out" });
};
module.exports = { signUp, signIn, signOut };
