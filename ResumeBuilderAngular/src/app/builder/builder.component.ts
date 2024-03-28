import { Component, ViewChild } from '@angular/core';
import { TinyMCEService } from '../service/tinymce.service';
import { PageviewerComponent } from './pageviewer/pageviewer.component';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
  
})
export class BuilderComponent {
@ViewChild(PageviewerComponent)
  pageViewer!:PageviewerComponent


}
