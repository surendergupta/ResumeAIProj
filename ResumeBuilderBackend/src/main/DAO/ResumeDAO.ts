import { MongoClient, ObjectId } from "mongodb";
import { ResumeModel } from "../models/models.js";
import { incrementResumes } from "./UserDAO.js";
declare const globalThis: any;
let mongoClient:MongoClient
export async function addResume(email:string,name:string,resumeModel:ResumeModel):Promise<boolean>
{   
    try{
        


            
                let col=globalThis.mongoClient.db('resume_builder').collection('resumes');
                await col.insertOne({time:Date.now(),resumename:name,'email':email,'state':"success","resumeModel":resumeModel});
                return true;
            
        }
    
    catch(E)
        {   
            console.log("Error while adding user in DAO",E);
            throw new Error("Couldn't Add Resume");
        }



}


export async function myResumes(email:string)
{
    try{
        


            
        let col=globalThis.mongoClient.db('resume_builder').collection('resumes');
        let cursor=col.find({email:email},{projection:{_id:1,resumename:1,state:1}}).sort({time:-1})
        let arr:any=[]
        while(await  cursor.hasNext())
            arr.push(await cursor.next())
        return arr;
    }

catch(E)
{   
    console.log("Error while adding user in DAO",E);
    throw new Error("Couldn't Add Resume");
}


}

export async function getResume(resumeId:string)
{
    try
    {
        let col=globalThis.mongoClient.db('resume_builder').collection('resumes');
        let resume=await col.findOne({_id:new ObjectId(resumeId)});
        if(resume == null)
            throw new Error("Couldn't Find resume")
        return resume 
    }
    catch(E)
    {
        console.log(E);
        throw new Error("Couldm't fetch resume");
    }

}

export async function setResumePending(userEmail:string,resumeName:string)
{
    try{
        


        await incrementResumes(userEmail,-1);
        let col=globalThis.mongoClient.db('resume_builder').collection('resumes');
        let data=await col.insertOne({time:Date.now(),resumename:resumeName,'email':userEmail,'state':"pending"});
        return data.insertedId.toString();
    
    }

    catch(E)
    {   
        console.log("Error while adding user in DAO",E);
        throw new Error("Couldn't Add Resume");
    }

}

export async function setResumeFailure(id:string) 
{
    try{
        


            
        let col=globalThis.mongoClient.db('resume_builder').collection('resumes');
        await col.findOneAndUpdate({_id:new ObjectId(id)},{$set:{'state':'failure'}})
        
    
    }

    catch(E)
    {   
        console.log("Error while Updating Resume",E);
        throw new Error("Couldn't Updating Resume");
    }
}

export async function setResumeSuccess(id:string,resumeModel:ResumeModel) 
{
    try{
        


            
        let col=globalThis.mongoClient.db('resume_builder').collection('resumes');
        await col.findOneAndUpdate({_id:new ObjectId(id)},{$set:{'state':'success','resumeModel':resumeModel}})

    
    }

    catch(E)
    {   
        console.log("Error while Updating Resume",E);
        throw new Error("Couldn't Updating Resume");
    }
}

export async function saveResume(resumeId:string,resumeModel:ResumeModel)
{
    try
    {
        let col=globalThis.mongoClient.db('resume_builder').collection('resumes');
        let result =await col.findOneAndUpdate({_id:new ObjectId(resumeId)},{$set:{'resumeModel':resumeModel}});
        if(result.value==null)
            throw new Error("coulnt Find Resume");
        

    }
    catch(E)
    {
        console.log(E);
        throw new Error("Couldn't update resume");

    }
}