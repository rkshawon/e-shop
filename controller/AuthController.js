const userModel = require('../model/User')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');



const logIn = async (req, res) =>{
    try {
        const user = await userModel.findOne({ email: req.body.email });
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        const { password, ...data} = user._doc
        if(!validPassword)
            res.status(400).json("wrong password")
        else
            res.status(200).json(data)     
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
            isAdmin: req.body.isAdmin
    })
    userRegister.save()
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(err=>{
        res.status(500).json(err)
    })}
}


module.exports = { logIn, register}