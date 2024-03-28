import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../service/auth.service";

@Injectable({providedIn:'root'})
export class LoggedOutGuard implements CanActivate
{   constructor(private authStore:AuthService,private router:Router)
    {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
    {
        if(!this.authStore.getCurrentUser().loggedIn)
            return true;
        else
            return this.router.parseUrl('/dashboard');  
    }
}