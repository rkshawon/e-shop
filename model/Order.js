const mongoose = require("mongoose")
const Schema = mongoose.Schema

const oModel =  new Schema({
    user_id:{
        type: String,
        required: true,
    },
    orders:[{
        name: {
            type: String,
            max: 50, 
        },
        price: {
            type: Number,
            max: 1000000,
        },
        quantity:{
            type: Number,
            default: 1
        },
    }]
}, {timestamps: true})

const orderModel = mongoose.model("Orders", oModel)
module.exports = orderModel