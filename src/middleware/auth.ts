import{NextFunction, Request, Response} from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import {APP_SECRET} from '../config'
import { User, UserAtrributes } from '../models/userModel'


export const auth = async(req: JwtPayload, res:Response, next: NextFunction)=>{
try {
        const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({
            Error: "kindly login as a user"
        })
    }

    //Bearer ebddbcdftgfdgfgfg

    const token = authorization.split(' ')[1]
    let verified = jwt.verify(token, APP_SECRET)
    
    if(!verified){
        return res.status(401).json({
            Error: "unauthorised "
        })
    }

    const {_id} = verified as {[key:string] : string}

    // find user by id
    const user = (await User.findOne(
        {id : _id }
      )) as unknown as UserAtrributes;

      if(!user){
        return res.status(401).json({
            Error: "Invalid credentials "
        })

      }
      req.user = verified
      next()


} catch (err) {
    return res.status(401).json({
            Error: "unauthorised"
        })
}

}

