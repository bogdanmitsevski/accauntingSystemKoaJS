import sequelize from '../db';
import {DataTypes} from 'sequelize';

const Item = sequelize.define('items',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    price: {type: DataTypes.INTEGER}
});

const User = sequelize.define('users',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
});

const Shift = sequelize.define('shifts',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    startedAt: {type: DataTypes.DATE},
    finishedAt: {type: DataTypes.DATE}
});

const Sell = sequelize.define('sells', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    shiftId:{type: DataTypes.INTEGER },
    itemId:{type: DataTypes.INTEGER },
    price: {type: DataTypes.INTEGER}
})

User.hasMany(Shift);
Shift.belongsTo(User);

Shift.hasMany(Sell);
Sell.belongsTo(Shift);

Sell.hasMany(Item);
Item.belongsTo(Sell);

export {
    Item,
    User,
    Shift,
    Sell
};