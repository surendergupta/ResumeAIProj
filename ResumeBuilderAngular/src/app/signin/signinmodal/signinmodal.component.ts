import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signinmodal',
  templateUrl: './signinmodal.component.html',
  styleUrls: ['./signinmodal.component.css']
})
export class SigninmodalComponent {
  state!:string
  message!:string
  name!:string
  @ViewChild('modal')
  modalRef!:TemplateRef<any>;

  constructor(private modalService:NgbModal)
  {

  }
  open(state:string)
  { this.state=state;
    this.modalService.open(this.modalRef,{backdrop:'static',centered:true,keyboard:false});
  }

  ngOnDestroy(): void 
  {
     
    if(this.modalService.hasOpenModals())
      this.modalService.dismissAll();
      
  } 
  close()
  {
    this.modalService.dismissAll();  
  }
}
