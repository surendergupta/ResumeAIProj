import { Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { SectionModel } from 'src/app/models/httpmodels';


@Component({
  selector: 'app-basic-section',
  templateUrl: './basic-section.component.html',
  styleUrls: ['./basic-section.component.css','../../text.css'],

})
export class BasicSectionComponent  implements OnInit
{
  @Input()
    sectionModel!:SectionModel
  @ViewChild("sectionheader",{read:ElementRef})
    sectionHeader!:ElementRef
  
  @ViewChild("sectioncontent",{read:ElementRef})
    sectionContent!:ElementRef
  @Input()
    sectionAlignment!:string


    constructor(private dragula:DragulaService)
    {
    
    }

    ngOnInit(): void 
    {
       
    } 
    serialize():SectionModel
    { 
      let sectionModel:SectionModel=
      { 
        name:this.sectionHeader.nativeElement.innerText.trim().toLowerCase(),
        headerContent:this.sectionHeader.nativeElement.innerHTML,
        sectionContent:this.sectionContent.nativeElement.innerHTML
      
      };

      return sectionModel
    }


}
