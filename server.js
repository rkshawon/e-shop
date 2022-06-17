const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const cors = require("cors")
const authRouter = require('./router/Auth')
const productRouter = require('./router/Product')
const orderRouter = require('./router/Order')


app.use(cors())
dotenv.config()
app.use(express())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("Database connected");
})

app.use('/auth', authRouter)
app.use('/product', productRouter)
app.use('/order', orderRouter)

const ___dirname1 = path.resolve()
app.use(express.static(path.join(___dirname1, "/client/build")))
app.get("*", (req, res)=>{
    res.sendFile(path.resolve(___dirname1, "client", "build", "index.html"))
})

app.listen(process.env.PORT || 8000, ()=>{
    console.log("server is runnig at port 8000");
})