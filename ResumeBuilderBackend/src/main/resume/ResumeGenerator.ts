import { BasicObject, ResumeModel, SectionModel } from "../models/models.js";
function sectionHeader(header:string):string
{  header=header.toUpperCase()
    return `<h3 style="text-align:center;"   ><span style='text-align:center;text-decoration:underline;font-weight:bold'>${header}</span></h3>`
}

export async function generateBasicResume(data:{[key:string]:string|string[]|BasicObject[]}):Promise<ResumeModel>
{  
    let modified:ResumeModel={headers:{},sections:[]};

    for(let x of Object.keys(data))
        switch(x)
        {
            case 'name':
                
                    modified["headers"]["name"]={name:"name",headerContent:`<h1 style="text-align:center">${data[x]}</h1>`};
                    break;

            case 'profession':
                
                    modified["headers"]["profession"]={name:"profession",headerContent:`<h3 style="text-align:center">${data[x]}</h3>`};
                    break;

            case 'email':
                modified["headers"]["email"]={name:"email",headerContent:`<h4>${data[x]}</h4>`};
                break;

            case 'phone':
                modified["headers"]["phone"]={name:"phone",headerContent:`<h4>${data[x]}</h4>`};
                break
            
            case 'abstract':
                    modified["sections"].push({name:"abstract",headerContent:sectionHeader(x as string) ,sectionContent:`<h4>${data[x]}</h4>`});
                    break;
            
            case 'education':
                let education:SectionModel={"name":x,headerContent:sectionHeader(x as string),sectionContent:""};
                let curString="<ul>"
                for(let y of data[x])
                {   y=y as BasicObject
                    curString+=`<li><h4>${y['course']}</h4><ul>`;
                    curString+=`<li><h5>${y['institution']}</h5></li>`
                    curString+=`<li><h5>${y['from']} - ${y["to"]}</h5></li></ul></li>`
                    
                }
                curString+='</ul>'
                education["sectionContent"]=curString;
                modified["sections"].push(education);
                break;

            case 'skills':
                    let skills:SectionModel={"name":x,headerContent:sectionHeader(x as string),sectionContent:""};
                    let skillString="<ul>"
                    for(let y of data[x])
                    {   y=y as BasicObject
                        skillString+=`<li><h4>${y['name']}</h4><ul>`;
                        skillString+=`<li><h5>${y['description']}</h5></li></ul></li>`
                        
                    }
                    skillString+='</ul>'
                    skills["sectionContent"]=skillString;
                    modified["sections"].push(skills);
                    break;
            
            case 'values':
                let values:SectionModel={"name":x,headerContent:sectionHeader(x as string),sectionContent:""};
                let valuesString="<ul>"
                    for(let y of data[x])
                    {   y=y as BasicObject
                        valuesString+=`<li><h4>${y['name']}</h4><ul>`;
                        valuesString+=`<li><h5>${y['description']}</h5></li></ul></li>`
                        
                    }
                    valuesString+='</ul>'
                    values["sectionContent"]=valuesString;
                    modified["sections"].push(values);
                    break;

            case 'work':
                        let work:SectionModel={"name":x,headerContent:sectionHeader(x as string),sectionContent:""};
                        let workString="<ul>"
                        for(let y of data[x])
                        {   y=y as BasicObject
                            workString+=`<li><h4>${y['company']}</h4><ul>`;
                            workString+=`<li><h5>${y['designation']}</h5></li>`
                            workString+=`<li><h5>${y['from']} - ${y["to"]}</h5></li></ul></li>`
                            
                        }
                        workString+='</ul>'
                        work["sectionContent"]=workString;
                        modified["sections"].push(work);
                        break;


        }
    
    return modified;
}

/**
 * {header:{"name":{}},sections:[{sectionName:string,sectionHeader:html,sectionContent:html}]}
 */