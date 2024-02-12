import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import route from './routes/route.js';
import dbConnection from './datbase/config.js';
dotenv.config({ path: "./config.env" });
// Db Connection

const app=express();

app.use(cors())
app.use(express.json())
app.use('/',route)
app.use('*',(req,res)=>{
    res.send('<h3>Welcome to server</h3>')
})
dbConnection();
app.listen(process.env.PORT|5000,(req,res)=>{
    console.log(`App is Running`)
})
