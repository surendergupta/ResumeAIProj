import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BasicObject } from '../service/auth.service';
import { ResumeEndpointService } from '../service/resumeEndpoint.service';

@Component({
  selector: 'app-myresumes',
  templateUrl: './myresumes.component.html',
  styleUrls: ['./myresumes.component.css']
})
export class MyresumesComponent implements OnInit
{
  resumes!:BasicObject[]
  httpSubsription!:Subscription
  state:string='loading'
  constructor(private resumeService:ResumeEndpointService)
  {


  }

  ngOnInit(): void {

    this.httpSubsription=this.resumeService.getMyResumes()
    .subscribe(data=>
      {
        if(data['success'])
        {
          this.resumes=data['data']
          this.state='success';
        }
        else
          this.state='failure'
      })
    
  }


}
