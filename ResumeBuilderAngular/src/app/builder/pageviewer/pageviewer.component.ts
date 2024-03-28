
import { Component, OnDestroy, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResumeModel, ResumeOptionsModel } from 'src/app/models/httpmodels';
import { BasicHeaderComponent } from 'src/app/resume/headers/basic-header/basic-header.component';
import { BasicSectionModel, UserModel } from 'src/app/resume/models/Models';
import { BasicSectionComponent } from 'src/app/resume/sections/basic-section/basic-section.component';
import { BasicTemplateComponent } from 'src/app/resume/templates/basic-template/basic-template.component';
import { AuthService } from 'src/app/service/auth.service';
import { ResumeEndpointService } from 'src/app/service/resumeEndpoint.service';
import { TinyMCEService } from 'src/app/service/tinymce.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-pageviewer',
  templateUrl: './pageviewer.component.html',
  styleUrls: ['./pageviewer.component.css'],
 
})
export class PageviewerComponent implements OnInit,OnDestroy
{ state='loading'
  resumeModel!:ResumeModel
  isDraggable=false;
  httpSubscription$!:Subscription
  curResumeId=''


  /**
   * Default Options
   */
  resumeOptions:ResumeOptionsModel={
    bodyBackgroundColor:'#ffffff',headerBackgroundColor:'#dc3545',
    headerTextColor:"#ffffff",
    bodyTextColor:'#000000',
    showEmail:true,
    showLocation:true,
    showPhone:true,
    headerAlignment:'horizontal',
    sectionAlignment:'vertical',
    profileImage:'assets/images.jpeg'
  }
  @ViewChild('resume')
    resume!:BasicTemplateComponent
  constructor(private toast:ToastService,public user:AuthService,private tinymce:TinyMCEService,private resumeService:ResumeEndpointService,private router:Router)
  {

  }

  addSection()
  { this.resumeModel=this.resume.serialize()

    this.resumeModel.sections.push({"name":"sample",headerContent:"<h2 style='text-align:center;text-decoration:underline'>Sample Header</h2>",sectionContent:"<h3>A Sample Content</h3>"})
      this.tinymce.update()
  }

  switchMode()
  {

    this.isDraggable=!this.isDraggable
    this.resumeModel=this.resume.serialize()
    if(this.isDraggable)
    { 
      this.toast.showInfo("Dragging Enabled","You Can Now Drag Section Components For Rearrangment!");
      this.tinymce.remove();
    }
    else
    {
      this.toast.showInfo("Text Editing Enabled","You Can Now Edit Text !");
      this.tinymce.update();
    }
  }
  save()
  { this.toast.showInfo("Resume Saving","Waiting For Response!!");
    let resumeId=this.router.routerState.snapshot.root.queryParamMap.get("resumeId");
    let curResumeSnapShot=this.resume.serialize();
    curResumeSnapShot.resumeOptions=this.resumeOptions;
    this.resumeService.updateResume(resumeId as string,curResumeSnapShot)
      .subscribe(

        (data)=>
        {
          if(data.success)
          {
            this.toast.showSuccess("Resume Saved","SuccessFully Saved Resume!!");
            console.log("resume updated")
          }
          else
          { 
            this.toast.showFailure("Resume Save Failed","Couldn't Save Resume");
            console.log("failed")
          }

        }
      )

  }




  ngOnInit(): void {
    
    
    let resumeId=this.router.routerState.snapshot.root.queryParamMap.get("resumeId");
    
    this.curResumeId=resumeId as string
    this.resumeService.getResume(resumeId as string).subscribe
    (

      (data)=>
      {
        if(data['success'])
        { if(data['data']?.resumeModel?.resumeOptions)
            this.resumeOptions=data['data']?.resumeModel?.resumeOptions;
            if(this.resumeOptions.sectionAlignment==null)
              this.resumeOptions.sectionAlignment='vertical';
            
            if(this.resumeOptions.headerAlignment==null)
              this.resumeOptions.headerAlignment='horizontal'
            if(this.resumeOptions.profileImage==null)
            this.resumeOptions.profileImage='assets/images.jpeg'
          this.resumeModel=data["data"]?.resumeModel as ResumeModel
          this.state='success'
          this.tinymce.update();
        }
        else
        {
          this.state='failure'
        }
      }
    );
  }

  ngOnDestroy(): void {
    if(this.httpSubscription$!=null)
      this.httpSubscription$.unsubscribe()
    this.toast.dismiss()
  }





}
