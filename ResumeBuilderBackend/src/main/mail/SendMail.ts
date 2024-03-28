import * as nodemailer from 'nodemailer'
import * as dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
     user: process.env.GMAIL_USER,
     pass: process.env.GMAIL_PASS,
    },
   });

export async function sendMail(userEmail:string,fileName:string){

    try{
        let mailOptions = {
            from: 'resumetogocapstone@gmail.com', 
            to: userEmail, 
            subject: 'Here is Your Resume', 
            text: 'Resume Has Been generated', 
            html: '<b>Heres Your Resume</b>', 
            attachments:[{filename:fileName+".pdf",path:`generated/${fileName}.pdf`}]
        };

            console.log("Sending Email")
        await transporter.sendMail(mailOptions);
    }
    catch(E)
    {
        console.log(E);
    }

}