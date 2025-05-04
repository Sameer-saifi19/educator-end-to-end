const { Router }  = require('express');
const adminRouter = Router();
const {adminModel} = require('../db')

adminRouter.post('/signup', function(req, res){
    res.json({
        message:"signup endpoint"
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