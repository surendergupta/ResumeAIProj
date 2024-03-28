import { Request, Response } from "express";
import { addResume, getResume, myResumes, saveResume, setResumeFailure, setResumePending, setResumeSuccess } from "../DAO/ResumeDAO.js";
import { getUser, incrementResumes } from "../DAO/UserDAO.js";
import { sendPDFToEmail } from "../fetchPdf/FetchPDF.js";
import { generateOpenAIJson } from "../resume/OpenAI.js";
import { generateBasicResume } from "../resume/ResumeGenerator.js";
import { sampleData } from "../sampleData/SampleData.js";

export async function addResumeEndpoint(req:Request,res:Response)
{
    let result={success:false,data:{},message:""};
    try
    {
        let resumename=req.body.resumename;
        let email=req.body.email;
        let userName=req.body.name;
        let userEmail=res.locals.user.email;
        
        if(userEmail == null)
            throw new Error("Cant't Find User");
        
        sampleData["name"]=userName;
        sampleData["email"]=email
        let resumeModel=await generateBasicResume(sampleData)


        await addResume(userEmail,resumename,resumeModel)
        result.message="Succesfully Added Resume";
        result.success=true;

    }
    catch(E)
    {
        console.log(E);
        result.success=false;
        result.message="Couldn't Add Resume";
    }

    res.json(result)

}

export async function getMyResumesEndpoint(req:Request,res:Response)
{
    let result={success:false,data:[],message:""};
    try 
    {   if(res.locals.user == null)
            throw new Error("Cant Fin User");
        
        let userEmail=res.locals.user.email;
        let data=await myResumes(userEmail);
        result.success=true;
        result.data=data;
    }
    catch(E)
    {
        console.log(E);
        result.success=false;
        result.message="Couldn't Get ";
    }

    res.json(result)
}

export async function getResumeEndpoint(req:Request,res:Response)
{
    let result={success:false,data:{},message:""};
    try
    {
        let resume=req.params.resumeId as string;
        if(resume == null)
            throw new Error("Fields Missing");
        let data=await getResume(resume);
        result.success=true
        result.data=data;
    }   
    catch(E)
    {
        console.log(E);
        result.success=false;
        result.message="An Error Occured";
    }

    res.json(result);
}


export async function addResumeOpenAIEndpoint(req:Request,res:Response)
{

    let result={success:false,data:{},message:""};
    try
    {
        let resumename=req.body.resumename;
        let userEmail=res.locals.user.email;
        let resumeDescription=req.body.resumedescription;
        
            
        let user=await getUser(userEmail);
        
        if(user == null)
            throw new Error("Cant't Find User");

        if(  user.aiResumesLeft == 0 )
        {
            result.success=false;
            result.message="No Resume Balance, Please Subscribe."
        }
        else
        {
         
         let id=await setResumePending(userEmail,resumename)        
         
            generateOpenAIJson(resumeDescription,3).then(
                (data)=>generateBasicResume(data))
                .then(
                    (resumeModel)=>setResumeSuccess(id,resumeModel)

                ).catch(err=>
                    {   incrementResumes(userEmail,1)
                        setResumeFailure(id)
                    }
                    )
        


        result.message="Succesfully Added Resume";
        result.success=true;
        }

    }
    catch(E)
    {
        console.log("Couldn't Find User.");
        result.success=false;
        result.message="Couldn't Add Resume";
    }

    res.json(result)
    
}

export async function saveResumeEndpoint(req:Request,res:Response)
{
    let result={success:false,message:""};
    try
    {
        if(req.body.resumeId == null  || req.body.resumeModel == null )
            throw new Error("Invalid Request Format");
        result.success=true
        await saveResume(req.body.resumeId,req.body.resumeModel);
    }
    catch(E)
    {
        console.log(E);
        result.success=false;
        result.message="An Error Occured";
    }
    res.json(result);

}

export async function sendResumeToEmailEndpoint(req:Request,res:Response) 
{   let result={success:false,message:""}
    try
    {
            let userEmail=req.body.email;
            let resumeId=req.body.resumeId;
            if(userEmail== null || resumeId == null)
                {
                        result.success=false;
                        result.message="An Error Occurred! Missing Email Or ResumeId."
                }
            else
            {
                let resume=await getResume(resumeId);
                await sendPDFToEmail(resumeId,userEmail);
                result.success=true;
                result.message="Email Sent! Check Your Inbox";
            }
    }
    catch(E)
    {
        result.success=false;
        result.message="An Error Occured";
    }
    
    res.json(result);
}