import {Sell, Shift, Item} from '../models/models';
class sellController {
    async newSell(ctx:any) {
        try {
            const SellActiveShift:any = await Shift.findOne ({
                where: {finishedAt: null},
                order: [ [ 'createdAt', 'DESC' ]],
            });

            const ItemActiveSell:any = await Item.findOne ({
                order: [ [ 'createdAt', 'DESC' ]],
            });

            const ItemsNumber:any = await Item.count();

            if(!SellActiveShift) {
                ctx.response.status = 400;
                ctx.body = 'Yoe need to create New Shift at first';
            }

            if(!ItemActiveSell) {
                ctx.response.status = 400;
                ctx.body = 'Yoe need to create New Item at first';
            }

            else if(ItemsNumber==1) {
            
                const shiftId = SellActiveShift.id;
                const itemId = ItemActiveSell.id
                const price = ItemActiveSell.price;

                const newSell:any = await Sell.create({
                    shiftId:shiftId,
                    itemId:itemId,
                    price:price
                });
                
                await newSell.save();
                ctx.body = `New Sell was created from last ItemId automatically (ID: ${newSell.id}), because Item is ONLY one. If you want add item manually, use post method body with itemId, price`;
            }

            else if(ItemsNumber>1) {
                const price = ctx.request.body.price;
                const itemId = ctx.request.body.id;
                const checkItem = await Item.findOne({
                    where: {id:itemId}
                });
                
                if(!checkItem) {
                    ctx.response.status = 400;
                    ctx.body = `Please, add correct itemId, price IS NOT REQUIRED`;
                }

                else if(price) {
                    const shiftId:any = SellActiveShift.id;
                    const newSell:any = await Sell.create({
                        shiftId:shiftId, 
                        itemId:itemId,
                        price
                    });

                    await newSell.save();
                    ctx.body = 'New Sell was created';
                }

                else {
                    const currentItem:any = await Item.findOne({
                        where:{id:itemId}
                    });
                    const price = currentItem.price;
                    const shiftId:any = SellActiveShift.id;
                    const newSell:any = await Sell.create({
                        shiftId:shiftId, 
                        itemId:itemId,
                        price
                    });
                    
                    await newSell.save();
                    ctx.body = 'New Sell was created';
                }
            }
            
        }
        catch(e) {
            console.log(e);
        }
    }
};

export default new sellController();