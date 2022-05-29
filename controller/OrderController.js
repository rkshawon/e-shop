const orderModel = require('../model/Order')

const orders = async (req, res)=>{
    console.log(req.params.id, req.body);
    try{
        const data = orderModel.updateOne(
            {user_id: req.params.id},
            {$push: {orders: req.body.orders}},
            { upsert: true }
        ).exec();
        res.status(200).json("data")
    }catch(err){
        res.status(500).json(err)
    }
}
const postorders = async (req, res)=>{
    const createOrder = new orderModel({
        user_id: req.body.user_id,
    })
    try{
        const data = await createOrder.save()
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
}

const getorders = async (req, res)=>{
    try{
        const data = await orderModel.find({user_id: req.params.id})
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
}
module.exports = { orders, getorders, postorders}