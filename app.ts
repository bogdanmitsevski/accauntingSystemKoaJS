require('dotenv').config();
import Koa from 'koa';
const app = new Koa();
import bodyParser from 'koa-bodyparser';
import sequelize from './db';
const port = process.env.PORT || 3010;
app.use(bodyParser());
const models = require('./models/models');
import router from './routes/index';

const start = async () => { 
    try {
        await sequelize.sync();
        await sequelize.authenticate();
app.listen(3010, ()=>{
    console.log(`Server is working on port ${port}`);
})
    }
    catch(e) {
        console.log(e);
    }

}
app.use(router.routes());
start();