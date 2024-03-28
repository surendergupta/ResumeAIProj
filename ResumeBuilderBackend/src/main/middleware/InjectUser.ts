import { Request, Response } from 'express'
import JWT from 'jsonwebtoken'

/**
 * Middle to inject user into middleware
 * @param req 
 * @param res 
 * @param next 
 */
export async function InjectUser(req:Request,res:Response,next:Function)
{   
    if(req.cookies.user!=null)
        {
            try{
                let userCookie=req.cookies.user;
                
                if(JWT.verify(userCookie,process.env.JWT_SECRET_KEY as string))
                    {
                        let user=JWT.decode(userCookie)
                        res.locals.user=user;
                    }
                }
                catch(E)
                {

                    console.log("Error while handling JWT in InjectUser",E);
                }
            
           

            
        }

    next();

}