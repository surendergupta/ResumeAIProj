import { Component } from '@angular/core';
import { TinyMCEService } from './service/tinymce.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'resumebuilder';

  constructor(private tinyService:TinyMCEService)
  {
    setTimeout(()=>tinyService.update(),200);
  }

}
