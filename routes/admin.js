const { Router }  = require('express');
const adminRouter = Router();
const bcrypt = require('bcrypt');
const { z } = require('zod');
const {adminModel} = require('../db');

adminRouter.post('/signup',async function(req, res){
    
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
        await adminModel.create({
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

adminRouter.post('/signin', function(req, res){
    res.json({
        message:"signin endpoint"
    })
})

adminRouter.post('/create', function(req, res){
    res.json({
        message:"purchases endpoint"
    })
})
adminRouter.put('/update', function(req, res){
    res.json({
        message:"purchases endpoint"
    })
})
adminRouter.delete('/delete', function(req, res){
    res.json({
        message:"purchases endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}