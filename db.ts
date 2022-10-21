import {Sequelize} from 'sequelize';
export default new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
    host: 'localhost'

})