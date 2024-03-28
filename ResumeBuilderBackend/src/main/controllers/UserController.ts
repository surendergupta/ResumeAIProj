import { Request, Response } from "express";
import  jwt from "jsonwebtoken";

import { addSubscription, addUser, containsUser, getUser, validateUser } from "../DAO/UserDAO.js";
import { UserModel } from "../models/models.js";
let maxSeconds=30*24*60*60*1000


export async function addUserEndpoint(req:Request,res:Response)
{   let result:{[key:string]:any}={'success':false};
    try{
        if(req.body.email==null||req.body.password == null || req.body.name == null )
            {
                result.message="Some Missing Fields!";
            }
        else
            {
                if(await containsUser(req.body.email))
                {
                    result.message="User Already Present"

                }
                else
                {
                    let verdict=await addUser(req.body.email,req.body.name,req.body.password);
                    if(verdict == false)
                    {
                        result.message="Couldn't Add User";
                    }
                    else
                    {   result.success=true;
                        result.message="Succesfully Added User";

                        result.data={email:req.body.email,name:req.body.name};
                        res.cookie('user',jwt.sign(result.data,process.env.JWT_SECRET_KEY as string),{maxAge:maxSeconds})
                    }

                }
        }
    }
    catch(E)
    {   result.success=false;
        result.message="A Fatal Error Occured";
        console.log("An Error Occured While Adding User",E);

    }

    res.json(result);
}

export async function loginUserEndpoint(req:Request,res:Response)
{   let result:{[key:string]:any}={'success':false};
    try{
        if(req.body.email==null||req.body.password == null )
            {
                result.message="Some Missing Fields!";
            }
        else
            {   let user=await getUser(req.body.email);
                if(user == null)
                {
                    result.message="User Is Not Registered!";

                }
                else
                {
                    let verdict=await validateUser(req.body.email,req.body.password);
                    if(verdict == false)
                    {
                        result.message="Invalid Password";
                    }
                    else
                    {   result.success=true;
                        result.message="Succesfully Logged In User";
                        user.password=""
                        result.data=user;
                        res.cookie('user',jwt.sign(result.data,process.env.JWT_SECRET_KEY as string),{maxAge:maxSeconds})
                    }

                }
        }
    }
    catch(E)
    {   result.success=false;
        result.message="A Fatal Error Occured";
        console.log("An Error Occured While Logging In User",E);

    }

    res.json(result);
}

export async function addSubscriptionEndpoint(req:Request,res:Response)
{
    let result={success:false,message:""}
    try
    {
        let user:UserModel|null = res.locals.user as UserModel;
        if(user == null)
            throw new Error("Couldn't Find user");
        
        let updatedUser=await getUser(user.email);

        if(updatedUser == null)
            throw new Error("Couldn't Find User");

        await addSubscription(updatedUser.email,req.body.subLevel);
        result.success=true;
        result.message="Added Subscription"

    }
    catch(E)
    {
        console.log(E);
        result.success=false;
        result.message="Couldn't Subscribe";
    }

    res.json(result);
}

export async function getLoggedInUser(req:Request,res:Response)
{
    let result:{success:boolean,data?:UserModel,loggedIn?:boolean}={success:false};
    try
    {
        if(res.locals.user ==null)
            throw new Error("Couldn't Find User");
        let user=await getUser((res.locals.user as UserModel).email);
        if(user !=null)
        {   user.password="";
            result.success=true;
            result.data=user;
            result.loggedIn=true;
        }
        else
        {   result.loggedIn=false;
            result.success=true;
        }

    }
    catch(E)
    {
        console.log("Couldn't Find User")
        result.success=false;
    }
    res.json(result);
}