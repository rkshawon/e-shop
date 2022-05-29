const mongoose = require("mongoose")
const Schema = mongoose.Schema

const pModel =  new Schema({
    name: {
        type: String,
        required: true,
        max: 50, 
    },
    price: {
        type: Number,
        required: true,
        max: 1000000,
    },
    images: {
        type: String,
        required: true,
    },
    category:{
        type: String
    },
    rating:{
        user_rating:{
            type: Number,
            default: 0
        },
        total_rating:{
            type: Number,
            default: 0
        },
        total_user:{
            type: Number,
            default: 0
        }
    },
    user_id:{
        type: Array
    }
}, {timestamps: true})

const productModel = mongoose.model("Product", pModel)
module.exports = productModel