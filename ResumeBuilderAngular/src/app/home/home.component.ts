import { Component, OnInit } from '@angular/core';
import { faCoffee, faFaceLaugh, faFile, faSadCry } from '@fortawesome/free-solid-svg-icons';
import { TinyMCEService } from '../service/tinymce.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  faFile=faFile
  constructor(private tinymce:TinyMCEService){}
  

  ngOnInit(): void {
    console.log("In Home Init")
    this.tinymce.update()
  }
}
