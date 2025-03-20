import { emailTemplates } from "../utils/email-template.js";
import transporter,{ accountEmail } from "../config/nodemailer.js";
import dayjs from "dayjs";

export const sendReminderEmail = async ({to, type, subscription}) => {
     if(!to || !type){
         throw new Error('Please provide a recipient and email type');
     }

     const template = emailTemplates.find((t) => t.label === type);

     if(!template){
         throw new Error('Invalid email type');
     }

     const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: new Date(subscription.renewalDate).format('MMM D, YYYY'),
        planName: subscription.name,
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod,
     }

     const message = template.generateBody(mailInfo);
     const subject = template.generateSubject(mailInfo);
     
     const mailOptions =
     {
         from: accountEmail, 
         to: to, 
            subject: subject,
            html: message,
     }

     transporter.sendMail(mailOptions, (error, info) => {
         if(error){
             console.log(error);
         }
         else{
             console.log('Email sent: ' + info.response);
         }
     });

    }