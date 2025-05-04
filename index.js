const express = require('express');
require('dotenv').config();
const { userRouter } = require('./routes/user');
const { adminRouter } = require('./routes/admin');
const { courseRouter } = require('./routes/course');
const { default: mongoose } = require('mongoose');
const app = express();

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/course', courseRouter)

const MONGO_URL = process.env.MONGO_URL

async function dbConnect(){
    await mongoose.connect(MONGO_URL)
    console.log(`Listening on port ${process.env.PORT}`)
}

dbConnect();