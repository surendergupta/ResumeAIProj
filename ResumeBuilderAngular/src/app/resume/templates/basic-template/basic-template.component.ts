import { Component, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { ResumeModel, ResumeOptionsModel, SectionModel } from 'src/app/models/httpmodels';
import { TinyMCEService } from 'src/app/service/tinymce.service';
import { BasicHeaderComponent } from '../../headers/basic-header/basic-header.component';
import { BasicSectionModel, UserModel } from '../../models/Models';
import { BasicSectionComponent } from '../../sections/basic-section/basic-section.component';

@Component({
  selector: 'app-basic-template',
  templateUrl: './basic-template.component.html',
  styleUrls: ['./basic-template.component.css']
})
export class BasicTemplateComponent implements OnInit,OnDestroy {
  @Input()
  resumeModel!:ResumeModel
  @Input()
    isPrint=false
  @ViewChild(BasicHeaderComponent)
    basicHeaderComponent!:BasicHeaderComponent

  @ViewChildren(BasicSectionComponent)
    basicSections!:QueryList<BasicSectionComponent>

  @Input()
  isDraggable!:boolean;

  @Input()
    resumeOptions!:ResumeOptionsModel

  constructor(private dragula:DragulaService,private tiny:TinyMCEService)
  {
      
  }



  ngOnInit()
  {
    let ops=this.dragula.createGroup('sectiondrag',{removeOnSpill:true,
      moves:()=>this.isDraggable
      
    });

    


  }
  ngOnDestroy(): void {
    this.dragula.destroy('sectiondrag');
  }
  
  serialize():ResumeModel
  { let headers=this.basicHeaderComponent.serialize();
    let sections:SectionModel[]=[];
    for(let x of this.basicSections)
      sections.push(x.serialize())
    let resumeModel:ResumeModel={headers:headers,sections:sections}
    return resumeModel
  }

}
