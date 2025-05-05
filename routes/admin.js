const { Router } = require("express");
const adminRouter = Router();
const bcrypt = require("bcrypt");
const { z } = require("zod");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { adminModel } = require("../db");

const adminSecret = process.env.JWT_ADMIN_SECRET;

adminRouter.post("/signup", async function (req, res) {
  const requiredbody = z.object({
    fullName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  });

  const safeParsedData = requiredbody.safeParse(req.body);

  if (!safeParsedData.success) {
    res.json({
      message: "Incorrect input format",
      error: safeParsedData.error,
    });
    return;
  }

  const { fullName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    await adminModel.create({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });
  } catch (e) {
    res.json({
      message: "Something went Wrorg",
    });
  }

  res.json({
    message: "Sign up Successfully",
  });
});

adminRouter.post("/signin", async function (req, res) {
  const requiredbody = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const safeParsedData = requiredbody.safeParse(req.body);

  if (!safeParsedData.success) {
    res.json({
      message: "Incorrect input format",
      error: safeParsedData.error,
    });
    return;
  }

  const { email, password } = req.body;

  try {
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      res.json({
        message: "user not found",
      });
      return;
    }

    const isPasswordCorrect =await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      res.status(401).json({
        message: "Incorrect email or password",
      });
      return;
    } else {
      const token = jwt.sign(
        {
          id: admin._id,
        },
        adminSecret
      );

      res.json({
        token: token,
        message: "sign in successfull",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
    return;
  }

});

adminRouter.post("/create", function (req, res) {
  res.json({
    message: "purchases endpoint",
  });
});
adminRouter.put("/update", function (req, res) {
  res.json({
    message: "purchases endpoint",
  });
});
adminRouter.delete("/delete", function (req, res) {
  res.json({
    message: "purchases endpoint",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
