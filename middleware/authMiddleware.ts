import jwt from 'jsonwebtoken';

export default async (ctx:any, next:any) => {
    if (ctx.method === "OPTIONS") {
        return next();
    }
    
    try {
        const token = ctx.headers.authorization.split(' ')[1];
        if (!token) {
            ctx.response.status = 401;
            ctx.body = "Authorization failed. To make some request, you need to be authorized in the system";
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
        ctx.user = decoded;
        return next();
    } 
    catch (e) {
        ctx.response.status = 401;
        ctx.body = "Authorization failed";
    }
};