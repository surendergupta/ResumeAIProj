import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthModel, AuthService } from '../service/auth.service';
const cards=[{
  title:"Create A Resume",
  description:"Resume Created Here Can Be Found Under My Resumes.",
  icon:"fa-plus",
  link:"/user/createResume"
},

{
  title:"My Resumes",
  description:"View All Your Resumes And Edit Them",
  icon:"fa-file",
  link:"/user/myResumes"
},
{
  title:"Add Subscription",
  description:"Add A Subscription",
  icon:"fa-dollar",
  link:"/user/addSubscription"
},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 

  currentUser$!:Observable<AuthModel>;
  cards=cards
  constructor(private userAuth:AuthService)
  {

  }

  ngOnInit()
  {
    this.currentUser$=this.userAuth.currentUser$;
  }
  
}
