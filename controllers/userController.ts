import {User} from '../models/models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateJwt = (id: any, email: any) => {
    return jwt.sign(
      {id, email}, 
        process.env.SECRET_KEY as string,
        {expiresIn: '24h'}
        );
}
class userController {
    async registration (ctx:any, next: any) {
        try {
            const email = ctx.request.body.email;
            const password = ctx.request.body.password;
            const isRegistered = await User.findOne({
                where:{email:email}
            });

            if(isRegistered) {
                ctx.body = `User with this email ${email} was already created`;
            }

            else {
                const hashPassword = await bcrypt.hash(password, 8);
                const newUser:any = await User.create({email, password:hashPassword});
                const token = generateJwt(newUser.id, newUser.email);
                await newUser.save();
                ctx.body = `New User was succesfully created with token ${token}`;
                
            }
        }
        catch(e) {
            console.log(e);
        }
    }

    async login (ctx:any, next: any) {
        try {
            const email = ctx.request.body.email;
            const password = ctx.request.body.password;
            const registeredUser:any = await User.findOne({
                where:{email}
            });
            
            if(!registeredUser) {
                ctx.response.status = 400;
                ctx.body = `User was not registered with email: ${email}`;
            }
            else {
                let comparePassword = bcrypt.compareSync(password, registeredUser.password);
                if(!comparePassword) {
                    ctx.response.status = 400;
                    ctx.body = 'Invalid password';
                }

                else {
                    const token = generateJwt(registeredUser.id, registeredUser.password);
                    ctx.body = `User was logined with TOKEN: ${token}`;
                }
            }
        }
        catch(e) {
            console.log(e);
        }

    }
}

export default new userController();