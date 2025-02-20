import jwt from "jsonwebtoken";
import User from "../models/auth.models.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide Email, password and Name",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User Not Found!",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        message: "Invalid Credentials!",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      }, //payload
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
        user: {
            id: user._id,
          email: user.email,
          name: user.name,
        },token,message: "Login Successfully" 

    })
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Email, password and Name are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User is already Exist!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
