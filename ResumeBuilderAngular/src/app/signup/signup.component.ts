import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, BasicObject } from '../service/auth.service';


import { SignupmodalComponent } from './signupmodal/signupmodal.component';

//Validate if both passwords match
const PasswordMatchValidator:ValidatorFn=(control)=>
{ 

  const userpassword=control.parent?.get("password")
  const repassword= control;
  return userpassword?.value != repassword?.value ? {"error":true} : null; 


}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
  
})
export class SignupComponent implements OnDestroy
{
  @ViewChild(SignupmodalComponent)
    modalComponent!:SignupmodalComponent

  signUpForm = new FormGroup({
  name: new FormControl("",[Validators.required,Validators.minLength(4)]),
  password: new FormControl("",[Validators.required,Validators.minLength(3)]),
  email: new FormControl("",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  retypepassword: new FormControl("",[Validators.required,PasswordMatchValidator,Validators.minLength(3)]),

  });

  httpSubscriber$!:Subscription;
  constructor(private authStore:AuthService,private router:Router)
  {
    
  }
  
  ngOnDestroy(): void {
    if(this.httpSubscriber$!=null)
    {
      console.log("Unsubscibing from http")
      this.httpSubscriber$.unsubscribe();
    }
  }

  submitForm()
  {
    
    let data:BasicObject={};
    for(let x in this.signUpForm.controls)
      data[x]=this.signUpForm.get(x)?.value;
    console.log(data)
    if(this.signUpForm.valid)
    {
      
    this.modalComponent.open('loading');
    this.httpSubscriber$= this.authStore.signUp(data).subscribe((res)=>
    { 
      if(res["success"])
      {   this.modalComponent.name=this.signUpForm.get("name")?.value as string;
          this.modalComponent.state="success";
          setTimeout(()=>this.router.navigateByUrl("/dashboard"),1500);
      }
      else
      {
        this.modalComponent.state="failure";
      }
    
      
    });
    }
    else
    {
        this.modalComponent.open("invalid");
    }
  

  }


}
