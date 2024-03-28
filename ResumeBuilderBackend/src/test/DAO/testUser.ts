
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv'
dotenv.config();

declare var globalThis: any;
globalThis.mongoClient=new MongoClient(process.env.MONGO_URL as string);

import { addUser, containsUser, getUser, validateUser } from "../../main/DAO/UserDAO.js";


//validateUser('sais@gmail.com','1234').then(console.log,x=>console.log)

//Fetch User
getUser('sai3@gmail.com').then(e=>console.log(e)).catch(e=>console.log(e))
//Check contains user
//containsUser('sai@gmail.com').then(e=>console.log(e)).catch(e=>console.log(e))

//Check add User
//addUser('sai@gmail.com','Govardhan','1234').then(d=>console.log(d)).catch((e)=>console.log(e))