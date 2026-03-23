import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import { connectMongoDb } from './connect.js'
import URL from "./models/url.js"
import {checkForAuthentication ,restrictTo} from "./middleware/auth.js"


import urlRoute from './routes/url.js'
import staticRoute from "./routes/staticRouter.js"
import userRoute from "./routes/user.js"


connectMongoDb(process.env.MONGODB_URI)

const app = express()

app.set('view engine', 'ejs');
app.set('views' , path.resolve('./views'))


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended : false}))
app.use(checkForAuthentication)


app.use("/url",restrictTo(["NORMAL","ADMIN"]) ,urlRoute)
app.use("/user" , userRoute)
app.use("/" , staticRoute)

app.get('/url/:shortid', async (req,res) =>{
    const shortid = req.params.shortid
    const entry = await URL.findOneAndUpdate({
        shortId: shortid
    },{
        $push: {
            visitHistory :{
                timestamp : Date.now()
            }
        }
    })
     if (!entry) {
        return res.status(404).send("Short URL not found");
    }
    res.redirect(entry.redirectUrl)
}) 

app.listen(process.env.PORT , ()=>{
    console.log("server started")
})