export type ResumeModel={headers:{[key:string]:HeaderModel},sections:SectionModel[],resumeOptions?:ResumeOptionsModel}
export type HeaderModel={name:string,headerContent:string}
export type SectionModel={name:string,headerContent:string,sectionContent:string}
export type ResumeOptionsModel=
{
    bodyBackgroundColor:string;
    bodyTextColor:string;
    headerBackgroundColor:string,
    headerTextColor:string,
    showEmail:boolean,
    showPhone:boolean,
    showLocation:boolean,
    sectionAlignment:string,
    headerAlignment:string,
    profileImage?:null|string|undefined
    

};