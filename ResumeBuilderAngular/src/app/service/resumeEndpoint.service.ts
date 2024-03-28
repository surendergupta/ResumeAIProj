import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { ResumeModel } from "../models/httpmodels";


@Injectable({providedIn:'root'})
export class ResumeEndpointService
{

        constructor(private http:HttpClient)
        {

            
        }
        

        createResume(resumeName:string,name:string,email:string):Observable<{success:boolean,message:string}>
        {
            return this.http.post<{success:boolean,message:string}>('/api/resume/createResume',{name:name,email:email,resumename:resumeName}).pipe(catchError(

                err=>{return of({success:false,message:"An Error Occure"})}
            ));
        }

        createResumeOpenAI(resumeName:string,resumeDescription:string):Observable<{success:boolean,message:string}>
        {
            return this.http.post<{success:boolean,message:string}>('/api/resume/createResumeOpenAI',{resumename:resumeName,resumedescription:resumeDescription}).pipe(catchError(

                err=>{return of({success:false,message:"An Error Occure"})}
            ));
        }

        getMyResumes():Observable<{success:boolean,data:{[key:string]:string}[]}>
        {
            return this.http.get<{success:boolean,data:{[key:string]:string}[]}>('/api/resume/myResumes')
            .pipe(catchError(err=>of({success:false,data:[]})))
            ;
        }

        getResume(resumeId:string):Observable<{success:boolean,data?:{resumeName:string,resumeModel:ResumeModel}}>
        {

            return this.http.get<{success:boolean,data:{resumeName:string,resumeModel:ResumeModel}}>(`/api/resume/getResume/${resumeId}`)
            .pipe(catchError(err=>of({success:false})))
        }

        updateResume(resumeId:string,resumeModel:ResumeModel):Observable<{success:boolean}>
        {
            return this.http.post<{success:boolean}>('/api/resume/updateResume',{resumeId:resumeId,resumeModel:resumeModel})
                .pipe(catchError(err=>of({success:false})));
        }

        sendResumeToMail(resumeId:string,email:string):Observable<{success:boolean}>
        {
            return this.http.post<{success:boolean,message:string}>('/api/resume/sendToMail',{resumeId:resumeId,email:email})
                .pipe(catchError(err=>of({success:false,message:"Fatal Error Occured!"})));
        }
}