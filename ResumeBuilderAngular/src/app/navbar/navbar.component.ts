import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  appName="ResumeToGo"
  loggedInNavs=[{name:"Create Resume",link:"/user/createResume"},{name:"My Resumes",link:'/user/myResumes'},{name:"Dashboard",link:"/dashboard"}]
  loggedOutNavs=[{name:"Sign In",link:'/signin'},{name:"Sign Up",link:'/signup'}]
  constructor(public authStore:AuthService,private router:Router)
  {

  }

  logout()
  {
    this.authStore.logout();
    this.router.navigateByUrl("/");
  }
}
