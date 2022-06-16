const userModel = require('../model/User')
const Token = require('../model/token')
const bcrypt = require('bcryptjs')
const jwt =  require('jsonwebtoken')
const { validationResult } = require('express-validator');
const stripe = require('stripe')('sk_test_51KyZM6IP0ODYVACVrqrzDaSp7sF0UwVXB7cXIve0s8Aoi1dnTpWCH5h5evwNs6bKNM9BZK7GDyX3xnaRftbuzt2W00acJTew8L');


const refreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
  
    if (!refreshToken) return res.status(401).json("You are not authenticated!");
    const findtoken = await Token.findOne({token: refreshToken})
    if (!findtoken) {
      return res.status(403).json("Refresh token is not valid!");
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, user) => {
      err && console.log(err);
      
      const newAccessToken = jwt.sign({data: user.data}, process.env.ACCESS_TOKEN)
      const newRefreshToken = jwt.sign({data: user.data}, process.env.REFRESH_TOKEN);
      await Token.findOneAndUpdate({user: user._id}, {token: newRefreshToken}, {new: true})
      
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
}


const logIn = async (req, res) =>{
    try {
        const user = await userModel.findOne({ email: req.body.email });
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        const { password, idAdmin, ...data} = user._doc
        if(!validPassword)
            res.status(400).json("wrong password")
        else{
            const accessToken = jwt.sign({data}, process.env.ACCESS_TOKEN, {expiresIn: '10m'})
            const refreshToken = jwt.sign({data}, process.env.REFRESH_TOKEN);
            const findtoken = await Token.find({user: user._id})
            
            if(findtoken.length<1){
                const refreshTokenModel = new Token({
                    user: user._id,
                    token: refreshToken
                })
                await refreshTokenModel.save()
            }
            else{
                await Token.findOneAndUpdate({user: user._id}, {token: refreshToken}, {new: true})
            }
            res.json({...data, accessToken, refreshToken}) 
        }       
      } catch (err) {
        res.status(500).json(err)
    }
}

const register = async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty())
        res.status(400).json(errors.array());
    else{
        const salt = await bcrypt.genSalt(10)
        const hassedPassword = await bcrypt.hash(req.body.password, salt)
        const userRegister = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: hassedPassword,
            isAdmin: req.body.isAdmin,
            shippingAddress:{
                ownerName: "",
                address: "",
                city: "",
                zipCode: "",
                phone: "",
                shippingEmail: ""
            },
    })
    userRegister.save()
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(err=>{
        res.status(500).json(err)
    })}
}
const payment = async (req, res)=>{
    const {id, basket, amount} = req.body
    const totalPrice = ()=>{
        let totalSum = 0
        basket?.forEach(b => { totalSum = totalSum + (b.price * b.quantity)})
        return totalSum
      }
    try{
        if(amount === totalPrice()){
            const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPrice() * 100,
            currency: 'USD',
            payment_method: id,
            confirm: true
        })
    }
    return res.status(200).json('successfull')
 }
    catch(err){
        res.status(500).json(err)
    }
}
const shippingAddress = async (req, res)=>{
    try{
        const update = await userModel.findByIdAndUpdate(
            req.params.id, {$set: {shippingAddress: req.body.shippingAddress}}
        )
        res.status(200).json(update)
    }catch(err){
        res.status(500).json(err)
    }
    
}
module.exports = { logIn, register, refreshToken, payment, shippingAddress}