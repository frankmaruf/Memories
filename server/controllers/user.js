import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

import dotenv from "dotenv";
dotenv.config();

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const isMatch = await bycrypt.compare(password, user.password);
    {
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
export const signup = async (req, res) => {
  const { firstName, lastName, avatar, email, password, confirmPassword } =
    req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const newUser = new User({
      firstName,
      lastName,
      avatar,
      email,
      password,
    });

    // Check confirm password and password
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Password do not match" });
    }

    //condition for password more then 8 characters and contain at least one number and one letter and one special character
    if (
      password.length < 8 ||
      !password.match(/[a-z]/) ||
      !password.match(/[0-9]/) ||
      !password.match(/[!@#$%^&*]/)
    ) {
      return res.status(400).json({
        msg: "Password must be at least 8 characters long and contain at least one number, one letter and one special character",
      });
    }

    // //condition for password more then 8 characters
    // if (password.length < 8) {
    //   return res
    //     .status(400)
    //     .json({ msg: "Password must be more then 8 characters" });
    // }

    // //password must contain at least one number and one uppercase and lowercase letter, and at least one special character
    // const regex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (!regex.test(password)) {
    //   return res.status(400).json({
    //     msg: "Password must be more then 8 characters and contain at least one number and one uppercase and lowercase letter, and at least one special character",
    //   });
    // }

    //password must contain at least one number
    // if (!password.match(/\d/)) {
    //   return res.status(400).json({ msg: "Password must contain at least one number" });
    // }

    //password must contain at least one number
    // if (!password.match(/\d/)) {
    //   return res.status(400).json({ msg: "Password must contain at least one number" });
    // }

    const salt = await bycrypt.genSalt(10);
    newUser.password = await bycrypt.hash(password, salt);
    await newUser.save();
    const payload = {
      user: {
        id: newUser.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
