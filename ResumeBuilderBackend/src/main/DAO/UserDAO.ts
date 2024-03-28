
import { MongoClient } from "mongodb";
import { UserModel } from "../models/models.js";
declare const globalThis: any;

export async function addUser(email:string,name:string,password:string):Promise<boolean>
{   
    try{
        

        if(await containsUser(email))
            {
                return false;
            }
        else
            {
            
                let col=globalThis.mongoClient.db('resume_builder').collection('users');
                await col.insertOne({'name':name,'email':email,password:password,isPremium:false,aiResumesLeft:0});
                return true;
            }
        }
    
    catch(E)
        {   
            console.log("Error while adding user in DAO",E);
            throw new Error("Couldn't add User");
        }



}


export async function containsUser(email:string) :Promise<boolean>
{ 
    try{
        
        let db=globalThis.mongoClient.db('resume_builder');
        let col=db.collection('users');
        let count=await col.countDocuments({email:email});
        if(count>0)
            {
                return true;
            }
        else
            {
            
            return false;
            }
        }
    
    catch(E)
        {   
            console.log("Error while checking contains user in DAO",E);
            throw new Error("Couldn't check contains User");
        }


}

export async function getUser(email:string):Promise<UserModel|null>
{   
    try
    {
        if(await containsUser(email))
        {   
            let data= (await globalThis.mongoClient.db('resume_builder').collection('users').findOne({email:email})) ;
            if(data == null)
                return null;
            let user:UserModel={email:email,name:data.name,password:data.password,
                isPremium:data.isPremium?data.isPremium:false,
                aiResumesLeft:data.aiResumesLeft?data.aiResumesLeft:0
                }
            return user;
        }
        else
            return null;


    }

    catch(E)
    {
        console.log("Error while getting user");
        throw new Error("Couln't Fetch user getUser DAO");
    }


}

export async function validateUser(email:string,password:string):Promise<boolean>
{
    try
    {
        let user=await getUser(email);
        if(user == null )
            return false;
        if(user.password == password)
            return true;
        else
            return false;
    }
    catch(E)
    {
        console.log("Error While Validating User");
        throw new Error("Error While validating user in UserDao");
    }

}

export async function addSubscription(email:string,subLevel:number)
{
    try
    {
        if(await containsUser(email))
        {   let resumesToBeAdded=0;let moneyPaid=0;
            if(subLevel==1)
            {
                resumesToBeAdded=2;
                moneyPaid=2;
            }
            if(subLevel==2)
            {
                resumesToBeAdded=10;
                moneyPaid=5;
            }
            if(subLevel==3)
            {
                resumesToBeAdded=100;
                moneyPaid=30;
            }

            if(subLevel<0 || subLevel>3)
                throw new Error("Invalid Sub Level");

            let col=globalThis.mongoClient.db('resume_builder').collection('users');
            let result =await col.findOneAndUpdate({email:email},{$set:{'isPremium':true},$inc:{'aiResumesLeft':resumesToBeAdded}});
            
            let subCol=globalThis.mongoClient.db('resume_builder').collection('subscriptions');
            await subCol.insertOne({email:email,subLevel:subLevel,moneyPaid:moneyPaid});

            if(result == null )
                throw new Error("Couldn't Update Record");
        }
        else
            throw new Error("Couldn't Find User")

    }
    catch(E)
    {
        console.log(E);
        throw new Error("Error While Add Sub to user in UserDao");
    }
    
}

export async function incrementResumes(email:string,count:number)
{
    try
    {

            if(await containsUser(email))
            {   
                let col=globalThis.mongoClient.db('resume_builder').collection('users');
                let result =await col.findOneAndUpdate({email:email},{$inc:{'aiResumesLeft':count}});
                

                if(result == null )
                    throw new Error("Couldn't Update Record");
            }
            else
                throw new Error("Couldn't Find User")
    }
    catch(E)
    {
        console.log(E);
        throw new Error("Couldn't Change Count");
    }

}