const productModel = require('../model/Product')

const singleproduct = async (req, res)=>{
    const productData = new productModel({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category || 'Desktop',
        images: req.body.images
    })
    try{
        const pdata = await productData.save()
        res.status(200).json(pdata)
    }catch(err){
        res.status(500).json(err)
    }
}
const allproduct = async (req, res)=>{
    try{
        const alldata = await productModel.find()
        res.status(200).json(alldata)
    }catch(err){
        res.status(500).json(err)
    }
}
const updaterating = async (req, res)=>{
    try{
        const rate = await productModel.findByIdAndUpdate(req.params.id, {$set: {rating: req.body.rating}})
        res.status(200).json(rate)
    }catch(err){
        res.status(500).json(err)
    }
}
const pushidinrating = async (req, res)=>{
    try{
        const data = productModel.findOneAndUpdate(
            req.params.id,
            {$addToSet: {user_id: req.body.userid}},
            { upsert: true }
        ).exec();
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
}
const getsingleproduct = async (req, res)=>{
    try{
        const data = await productModel.findOne({_id: req.params.id})
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
}
module.exports = { singleproduct, allproduct, updaterating, pushidinrating, getsingleproduct}