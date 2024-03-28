import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import tinymce from "tinymce";


@Injectable({providedIn:'root'})
export class TinyMCEService
{   //option={plugins:'lists', fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",toolbar: 'undo alignleft aligncenter forecolor fontsizeselect redo size numlist bullist bold underline italic indent outdent',keep_styles:true,inline:true,selector:'.editable,.editablex',menubar:false,valid_children : 'span[style],+body[style],-body[div],p[strong|a|#text]',valid_elements:"*[*]",extended_valid_elements: 'body[style],*[style]'}
    
    option={plugins:'lists', fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",toolbar: 'undo alignleft aligncenter forecolor fontsize  redo size numlist bullist bold underline italic indent outdent',keep_styles:true,inline:true,selector:'.editable,.editablex',menubar:false,valid_children : '+body[style],-body[div],p[strong|a|#text]',valid_elements:"*[*]",extended_valid_elements: 'span[style]'};
    constructor(private router:Router)
    {
       
        

            
    }

    update()
    {   console.log("In tinymce update")
        tinymce.remove();
        setTimeout(()=>tinymce.init(this.option).catch(e=>console.log("Error")),100);
        
    }
    remove()
    {
        tinymce.remove()
    }
}