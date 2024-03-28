export type UserModel= {name:string,email:string,password:string,isPremium:boolean,aiResumesLeft:number}
export type BasicObject={[key:string]:string|boolean|number}
export type ResumeModel={headers:{[key:string]:HeaderModel},sections:SectionModel[],resumeOptions?:ResumeOptionsModel}
export type HeaderModel={name:string,headerContent:string}
export type SectionModel={name:string,headerContent:string,sectionContent:string}
export type ResumeOptionsModel=
{
    bodyBackgroundColor:string;
    bodyTextColor:string;
    headerBackgroundColor:string,
    headerTextColor:string,
    showPhone:boolean,
    showEmail:boolean,
    showLocation:boolean,

    sectionAlignment:string,
    headerAlignment:string,
    profileImage:string

};
