import { generateBasicResume } from "../../main/resume/ResumeGenerator.js";
import {readFileSync} from 'fs';

generateBasicResume(JSON.parse(readFileSync('testdata/test.json',{encoding:'utf8'}))).then(
    
    (x)=>console.log(JSON.stringify(x))
    
    
    );

