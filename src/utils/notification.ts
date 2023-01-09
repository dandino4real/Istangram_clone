import nodemailer from 'nodemailer';
import { FromAdminMail, GMAIL_PASS, GMAIL_USER, userSubject } from '../config';


export const generateOtp =()=>{
    const otp = Math.floor(1000 + Math.random()*9000)
    const expiryTime = new Date()
    expiryTime.setTime(new Date().getTime() + (30 * 60 * 1000))
    return {otp, expiryTime}
}



const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: GMAIL_USER, 
        pass: GMAIL_PASS, 
      },
      tls: {
        rejectUnauthorized: false,
      }
})

export const sendEmail=async(
    from: string,
    to: string,
    subject: string,
    html: string
)=>{
    try {
        const response = await transport.sendMail({
            from: FromAdminMail, // sender address
            to, 
            subject: userSubject, 
            html // html body
          })
          return response; 
    } catch (error) {
        console.log(error);
        
    }
};

export const eHtml=(otp: number) :string=>{
    let result = `
    <div style = "max-width:700px; margin: auto; border: 10px solid #ddd; padding: 50px, 20px; font-size: 110%;">
    <h2 style = "text-align: center; text-transform: uppercase; color: teal;">
    Welcome to Victor Store
    </h2>
    <p>
    Hi there, your OTP is ${otp}
    </p>
    </div>
    `
    return result;
}
