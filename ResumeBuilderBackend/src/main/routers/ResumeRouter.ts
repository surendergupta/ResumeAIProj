import { Router } from "express";
import { addResumeEndpoint, addResumeOpenAIEndpoint, getMyResumesEndpoint, getResumeEndpoint, saveResumeEndpoint, sendResumeToEmailEndpoint } from "../controllers/ResumeController.js";


let resumeRouter=Router()

resumeRouter.post('/createResume',addResumeEndpoint);
resumeRouter.get('/myResumes',getMyResumesEndpoint);
resumeRouter.get('/getResume/:resumeId',getResumeEndpoint);
resumeRouter.post('/createResumeOpenAI',addResumeOpenAIEndpoint);
resumeRouter.post('/updateResume',saveResumeEndpoint);
resumeRouter.post('/sendToMail',sendResumeToEmailEndpoint)
export {resumeRouter}