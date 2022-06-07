const mongoose = require("mongoose")
const Schema = mongoose.Schema

const uModel =  new Schema({
    name: {
        type: String,
        required: true,
        max: 20, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 30,
        min: 6
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    shippingAddress:{
        ownerName:{
            type: String,
            max:30,
        },
        address:{
            type: String,
            max: 90
        },
        city:{
            type: String,
            max: 15
        },
        zipCode:{
            type: String,
            max: 6,
            min:2
        },
        phone:{
            type: String,
            max:11,
            min:10
        },
        shippingEmail:{
            type: String,
        }
    },
}, {timestamps: true})

const userModel = mongoose.model("User", uModel)
module.exports = userModel