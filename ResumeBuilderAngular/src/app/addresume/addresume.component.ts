import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ResumeEndpointService } from '../service/resumeEndpoint.service';
import { SigninmodalComponent } from '../signin/signinmodal/signinmodal.component';

@Component({
  selector: 'app-addresume',
  templateUrl: './addresume.component.html',
  styleUrls: ['./addresume.component.css']
})
export class AddresumeComponent implements OnInit,OnDestroy
{
  resumeName=new FormControl("",[Validators.required])
  email=new FormControl("",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  name=new FormControl("",Validators.required)
  openai=new FormControl();
  @ViewChild(SigninmodalComponent)
    modalComponent!:SigninmodalComponent
  @ViewChild('description',{read:ElementRef})
    resumeDescription!:ElementRef


  httpSubscription$!:Subscription
  constructor(private router:Router,public authService:AuthService,private resumeService:ResumeEndpointService)
  {

  }

  ngOnInit(): void {
    this.email.setValue(this.authService.getCurrentUser().email)
    this.name.setValue(this.authService.getCurrentUser().name)
    setTimeout(()=>console.log(this.openai.value),1000)
  }

  ngOnDestroy(): void 
  { 
    if(this.httpSubscription$!=null)
      this.httpSubscription$.unsubscribe()  
  }

  submit()
  { 
    
    if(this.email.valid && this.name.valid && this.resumeName.valid)
    {
      if(this.openai.value!=true){
      this.modalComponent.open('loading');
      this.httpSubscription$=this.resumeService.createResume(this.resumeName.value as string,this.name.value as string,this.email.value as string )
      .subscribe(data=>
        {
          if(data["success"])
          { this.modalComponent.message="Added The Resume";
            this.modalComponent.open('success');
            setTimeout(()=>this.router.navigateByUrl('/dashboard'),200);
          }
          else
          { 
            this.modalComponent.message=data.message;
            this.modalComponent.open('failure')
          }
        });
      ;}
      else
      { this.modalComponent.open('loading');
        this.httpSubscription$=this.resumeService.createResumeOpenAI(this.resumeName.value as string,this.resumeDescription.nativeElement.value as string)
        .subscribe(data=>
          {
            if(data["success"])
            { this.modalComponent.message="Added The Resume";
              this.modalComponent.open('success');
              this.authService.refresh()
              setTimeout(()=>this.router.navigateByUrl('/dashboard'),200);
            }
            else
            {
              this.modalComponent.message=data.message;
              this.modalComponent.open('failure')
            }
          });


      }
    }

    else
    { this.modalComponent.message="Please Enter Valid Fields!";
      
      this.modalComponent.open('failure')
    }
    
  }
}
