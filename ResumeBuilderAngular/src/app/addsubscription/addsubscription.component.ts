import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { SigninmodalComponent } from '../signin/signinmodal/signinmodal.component';

@Component({
  selector: 'app-addsubscription',
  templateUrl: './addsubscription.component.html',
  styleUrls: ['./addsubscription.component.css']
})
export class AddsubscriptionComponent implements OnDestroy{
@ViewChild('modal')
  modal!:SigninmodalComponent
  httpSubscription!:Subscription
  constructor(private authService:AuthService,private router:Router)
  {

  }
  ngOnDestroy(): void {
    if(this.httpSubscription!=null)
      this.httpSubscription.unsubscribe()
  }

  submit(subLevel:number)
  { this.modal.open('loading');
    this.httpSubscription =this.authService.addSubscription(subLevel)
    .subscribe(
      (data)=>
      {
        if(data["success"])
          {
            this.modal.message=data.message;
          
            this.modal.open('success');
            this.authService.refresh()
            setTimeout(()=>this.router.navigateByUrl('/dashboard'),300);
          }
        else
        {
          this.modal.message=data.message;
          
          this.modal.open('failure')
        }
      }
    )
  }

}
