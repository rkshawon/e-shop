const mongoose = require("mongoose")
const Schema = mongoose.Schema

const tModel =  new Schema({
    token:{
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
}, {timestamps: true})

const tokenModel = mongoose.model("Token", tModel)
module.exports = tokenModel