import * as dotenv from 'dotenv';
dotenv.config();
import  Express  from "express";
import { MongoClient } from "mongodb";
import {existsSync,mkdirSync} from 'fs';
import { userRouter } from "./routers/UserRouter.js";
import { resumeRouter } from "./routers/ResumeRouter.js";
import { InjectUser } from "./middleware/InjectUser.js";
import cookieparser from 'cookie-parser'

declare const globalThis: any;

globalThis.mongoClient=new MongoClient(process.env.MONGO_URL as string);
if(!existsSync('generated'))
    mkdirSync('generated')
let app:Express.Express=Express();

app.use(Express.json({limit:'10mb'}))
app.use(cookieparser())


app.use('/',InjectUser);
app.use('/api/user',userRouter);
app.use('/api/resume/',resumeRouter);



app.listen(4292,()=>
{
    console.log("Listening At Port 4292")
})


