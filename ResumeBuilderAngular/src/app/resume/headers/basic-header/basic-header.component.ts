import { Component, ElementRef, Input, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { HeaderModel, ResumeOptionsModel } from 'src/app/models/httpmodels';

@Component({
  selector: 'app-basic-header',
  templateUrl: './basic-header.component.html',
  styleUrls: ['./basic-header.component.css',"../../text.css"],

})
export class BasicHeaderComponent implements OnInit,OnDestroy {
  faEnvelope=faEnvelope
  faPhone=faPhone
  faLocation=faLocationDot
  @Input()
  headerModel!:{[key:string]:HeaderModel}

  @ViewChild('name',{read:ElementRef})
    name!:ElementRef
  
  @ViewChild('profession',{read:ElementRef})
    profession!:ElementRef

  @ViewChildren('header',{read:ElementRef})
    headers!:QueryList<ElementRef>

  @Input()
    resumeOptions!:ResumeOptionsModel

  ngOnInit(): void {
  
  }
  constructor(private modalService:NgbModal)
  {

  }
  serialize():{[key:string]:HeaderModel}
  { let newHeaderModel:{[key:string]:HeaderModel}={};
    for(let x of this.headers)
      { let headerName:string=x.nativeElement.id;
        let headerContent:string=x.nativeElement.innerHTML;
        newHeaderModel[headerName]={name:headerName,headerContent:headerContent};
      }
    //console.log(newHeaderModel)
    return newHeaderModel;
  }


  //Code For Cropping
    imageChangedEvent: any = '';


    @ViewChild("modal")
      modal!:TemplateRef<any>;
    @ViewChild("profileimage",{read:ElementRef})
      userImage!:ElementRef<HTMLImageElement>;

    modalRef!:NgbModalRef  ;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    
    this.modalRef= this.modalService.open(this.modal,{backdrop:"static",keyboard:false})
    
}
imageCropped(event: ImageCroppedEvent) {
    this.resumeOptions.profileImage=event.base64
    
}

exitModal()
{ 
  this.modalService.dismissAll();
  
}
saveImage()
{

  this.modalService.dismissAll();


}

ngOnDestroy(): void {
  this.modalService.dismissAll()
}

}
