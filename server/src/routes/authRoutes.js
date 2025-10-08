const express = require("express");
const { body } = require("express-validator");
const { register, login } = require("../controllers/authController");
const auth = require("../middlewares/auth");
const User = require("../models/User");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password min 6 chars"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

// Protected: return current user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "role"],
    });
    if (!user) return res.status(404).json({ ok: false, message: "User not found" });
    return res.json({ ok: true, user });
  } catch (e) {
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

module.exports = router;
