import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject,catchError,Observable, of, tap } from "rxjs";


export type AuthModel={name:string,email:string,loggedIn:boolean,isPremium:boolean,aiResumesLeft:number};
export type BasicObject={[key:string]:any}
@Injectable({providedIn:'root'})
export class AuthService
{
    private subject$:BehaviorSubject<AuthModel>;
    currentUser$:Observable<AuthModel>;
    
    constructor(private http:HttpClient,private cookieService:CookieService)
    {   let defaultRole:AuthModel={name:"Govardhan",email:"","loggedIn":false,isPremium:false,aiResumesLeft:0};
        this.subject$=new BehaviorSubject(defaultRole);
        if(localStorage.getItem("user")!=undefined&&localStorage.getItem("user")!=null)
            {
                this.subject$.next(JSON.parse(localStorage.getItem("user") as string) as AuthModel);
            }
        this.refresh()
        this.currentUser$=this.subject$.asObservable().pipe();
        
       
    }

    getCurrentUser()
    {
        return this.subject$.value;
    }

    signUp(data:BasicObject):Observable<BasicObject>
    {
        return this.http.post<BasicObject>('/api/user/addUser',data).pipe(catchError(
            ()=>of({"success":false,"message":"An error occurred."})
            )).pipe(tap(
                res=>{if(res["success"])
                {
                    console.log("Added user to local storage");
                    let resData=res["data"];
                    let user:AuthModel={aiResumesLeft:resData["aiResumesLeft"],name:resData["name"],email:resData["email"],loggedIn:true,isPremium:false}
                    localStorage.setItem("user",JSON.stringify(user));
            
                    this.subject$.next(user);
                }
                }
            ));
            
    }


        login(data:BasicObject):Observable<BasicObject>
        {
            return this.http.post<BasicObject>('/api/user/login',data).pipe(catchError(
                ()=>of({"success":false,"message":"An error occurred."})
                )).pipe(tap(
                    res=>{if(res["success"])
                    {
                        console.log("Added user to local storage");
                        let resData=res["data"];
                        let user:AuthModel={aiResumesLeft:resData["aiResumesLeft"],isPremium:resData["isPremium"],name:resData["name"],email:resData["email"],loggedIn:true}
                        localStorage.setItem("user",JSON.stringify(user));
                
                        this.subject$.next(user);
                    }
                    }
                ));
        
    }

    logout()
    {
        localStorage.clear();
        this.cookieService.deleteAll();
        this.subject$.next({loggedIn:false,name:"",email:"",isPremium:false,aiResumesLeft:0});
    }


    refresh()
    {   console.log("REFRESHING USER")
        let subscription=this.http.get<{success:boolean,loggedIn?:boolean,data:AuthModel,message:string}>('/api/user/getLoggedIn').pipe(catchError(
            ()=>of({"success":false,loggedIn:false,"message":"An error occurred.",data:null})
            )).pipe(tap(
                res=>{if(res["success"])
                {   if(!res.loggedIn)
                    {

                        this.logout()
                    }
                    else{
                    console.log("Added user to local storage");
                    let resData=res["data"] as AuthModel;
                    let user:AuthModel={aiResumesLeft:resData["aiResumesLeft"],isPremium:resData["isPremium"],name:resData["name"],email:resData["email"],loggedIn:true}
                    localStorage.setItem("user",JSON.stringify(user));
            
                    this.subject$.next(user);}
                }
                }
            )).subscribe();
    }

    addSubscription(subLevel:number):Observable<{success:boolean,message:string}>
    {
        return this.http.post<{success:boolean,message:string}>('/api/user/addSubscription',{subLevel:subLevel})
        .pipe(catchError(err=>{console.log(err);return of({success:false,message:"An Error Occured"})}))
        
        ;

    }
}