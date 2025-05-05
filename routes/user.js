const { Router }  = require('express');
const bcrypt = require('bcrypt');
const { z } = require('zod');
require("dotenv").config();
const { userModel } = require('../db');
const userRouter = Router();

const userSecret = process.env.JWT_USER_SECRET;

userRouter.post('/signup',async function(req, res){
    const requiredbody = z.object({
        fullName: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
    })

    const safeParsedData = requiredbody.safeParse(req.body);

    if(!safeParsedData.success){
        res.json({
            message:"Incorrect input format",
            error: safeParsedData.error
        })
        return
    }
    
    const { fullName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password,5)

    try {
        await userModel.create({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        })
    } catch (e) {
        res.json({
            message:"Something went Wrorg"
        })
    }

    res.json({
        message:"Sign up Successfully"
    })
})

userRouter.post('/signin',async function(req, res){
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
        const user = await userModel.findOne({ email });
    
        if (!user) {
          res.json({
            message: "user not found",
          });
          return;
        }
    
        const isPasswordCorrect =await bcrypt.compare(password, user.password);
    
        if (!isPasswordCorrect) {
          res.status(401).json({
            message: "Incorrect email or password",
          });
          return;
        } else {
          const token = jwt.sign(
            {
              id: user._id,
            },
            userSecret
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
      }
      
})

userRouter.post('/purchases', function(req, res){
    res.json({
        message:"purchases endpoint"
    })
})

module.exports = {
    userRouter: userRouter
}