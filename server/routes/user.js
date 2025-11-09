import express from "express";
import UserSession from "../models/UserSession.js";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    let user = await UserSession.findOne({ email });

    if (!user) {
      user = await UserSession.create({
        userId: uuidv4(),
        email,
        name: null,
        phoneNumber: null,
        devices: [],
      });
    }

    res.json({
      success: true,
      message: "User details",
      user: {
        userId: user.userId,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        devices: user.devices,
      },
    });
  } catch (error) {
    console.error("User error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
