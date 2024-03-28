
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { AuthService, BasicObject } from '../service/auth.service';

import { SigninmodalComponent } from './signinmodal/signinmodal.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],

  
})
export class SigninComponent{
  signInForm=new FormGroup({
  email:new FormControl("",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  password:new FormControl("",[Validators.required,Validators.minLength(3)])});

  httpSubscriber$!:Subscription
  
  @ViewChild(SigninmodalComponent)
    modalComponent!:SigninmodalComponent

  constructor(private authStore:AuthService,private router:Router)
  {

  }

  submitForm()
  {
    let data:BasicObject={};
    for(let x in this.signInForm.controls)
      data[x]=this.signInForm.get(x)?.value;
    console.log(data);
    if(this.signInForm.valid)
    {
      
    this.modalComponent.open('loading');
    this.httpSubscriber$= this.authStore.login(data).subscribe((res)=>
    { 
      if(res["success"])
      {   
          this.modalComponent.state="success";
          this.modalComponent.message=res["message"] as string;
          setTimeout(()=>this.router.navigateByUrl("/dashboard"),1500);
      }
      else
      { this.modalComponent.message=res["message"] as string;
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
