import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import route from './routes/route.js';
import dbConnection from './datbase/config.js';
dotenv.config({ path: "./config.env" });
import compression from 'compression';

// Db Connection
const app=express();

app.use(cors())
app.use(express.json())
app.use(compression());

app.use('/',route)
app.use('*',(req,res)=>{
    res.send('this route not found')
})
dbConnection();
app.listen(process.env.PORT|5000,(req,res)=>{
    console.log(`App is Running`)
})
