import { SERVER_URL } from '../config/env.js';
import { workflowClient } from '../config/upstash.js';
import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        await workflowClient.trigger({
            url: `${SERVER_URL}/workflows/subscriptions/reminders`,
            body: {subscriptionId: subscription._id},
            headers: {
                'content-type': 'application/json',
            },
            workflowRunId: null,
            retries: 0,

        })

        res.status(201).json({success: true, data: subscription});
    }
    catch(error){
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try{
        //check if the user is same as the one in the token 
        if(req.user.id !== req.params.id){
            const error = new Error('you are not the ownwer of this account');
            error.statusCode = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({user: req.params.id});
        
        res.status(200).json({success: true, data: subscriptions});
    }
    catch(error){
        next(error);
    }
}