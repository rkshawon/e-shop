const productModel = require('../model/Product')

const singleproduct = async (req, res)=>{
    
    const productData = new productModel({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category || 'Desktop',
        images: req.body.images,
        admin_id: req.params.id
    })
   
    try{ 
        if(req.user._id === req.params.id || req.user.isAdmin){            
            const pdata = await productData.save()
            res.status(200).json(pdata)   
        }else{
            res.status(403).json("You are not allow to upload product")
        }
    }catch(err){
        console.log("producterr",req.params.id , req.user);
        res.status(500).json(" faking errerr")
    }
}
const allproduct = async (req, res)=>{
    try{
        if(req.params.id === "laptop"){
            const alldata = await productModel.find({category: "Laptop"})
            res.status(200).json(alldata)
        }
        if(req.params.id === "computer"){
            const alldata = await productModel.find({category: "Desktop"})
            res.status(200).json(alldata)
        }
        if(req.params.id === "mobile"){
            const alldata = await productModel.find({category: "Mobile"})
            res.status(200).json(alldata)
        }
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
            {_id:req.params.id},
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
const searchproduct = async (req, res)=>{
    try{
        let regex = new RegExp(req.query.name, 'i')
        const data = await productModel.find({name: regex})
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
}
const adminproduct = async (req, res)=>{
    try{
        const data = await productModel.find({admin_id: req.params.id})
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
}
module.exports = {
    singleproduct,
    allproduct,
    updaterating,
    pushidinrating,
    getsingleproduct,
    searchproduct,
    adminproduct
}