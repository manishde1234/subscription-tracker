import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try{
        const decision = await aj.protect(req,{requested: 1});

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).send("Rate limit exceeded");
            }

            if(decision.reason.isBot()){
                return res.status(403).send("Bots are not allowed");
            }

            return res.status(403).json({error:"Access denied"});
        }

        next();
    }
    catch(error){
        console.log(`Error in arcjetMiddleware: ${error}`);
        next(error);
    }
}

export default arcjetMiddleware;