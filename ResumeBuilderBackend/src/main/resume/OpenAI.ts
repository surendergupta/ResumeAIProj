import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';
dotenv.config();
import JSON5 from 'json5'
import { BasicObject } from "../models/models";

const configuration = new Configuration({
    apiKey:process.env.OPENAI_KEY,
  });

  const openai = new OpenAIApi(configuration);
  
async function generateOpenAIJson(resumeDescription:string,retryLeft:number):Promise<any>{
try{

const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `
    generate resume from given text\n

    Instructions:
    Extract the name of the person.\n
    Extract the profession of the person\n
    Extract the skills provided and something extra in description which tells how I used the skill, skill description must be long.\n
    Extract the education details\n
    Extract the work history\n
    Generate an abstract about the person, Abstract must be long\n
    Generate 3 random life skill values and description, skill description must be long \n
    


    \n\n
    Text:"""
   ${resumeDescription}
    """


    
    \n\n
    Format it in  json, Json properties  must be enclosed in double quotes and must be lowercase and all values must be enclosed in double quotes if strings:\n\n
    "name": string\n
    "profession":string\n
    "abstract" : string\n
    "values": ["name":Name Of Value,"description":Something about the value]\n
    "skills": ["name":Name Of Skill,"description":Something about the skill]\n
    "education": array of {"institution":Name Of Institution,"from":Start Date,"to":Last Date,"course": Name of course studied}\n
    "work":array of {"company":Name of company,"designation":The designation in the company,"from":Joining Date,"to":Last Date}

        
        
  `,max_tokens:2000
});

/*

     Format it in  json, Json properties  must be enclosed in double quotes and must be lowercase and all values must be enclosed in double quotes if strings:\n\n
        "name": string\n
        "profession":string\n
        "abstract" : string\n
        "values": array of string\n
        "skills": array of object with name and description\n
        "education":array of object with institution, from, to, course.\n
        "work":array of objects with company, designation, from and to
    
*/

let x=completion.data.choices[0].text as string

let valu=completion.data.choices[0].text?.substring(x.indexOf("{"),x.lastIndexOf("}")+1);
let parse=JSON5.parse(valu as string);
return  parse;

}
catch(E)
{
    if(retryLeft==0)
        throw new Error("Retries Completed")   
    else
        console.log("Attempt OPENAI FAILED");

    return generateOpenAIJson(resumeDescription,retryLeft-1);
}


}

export {generateOpenAIJson}