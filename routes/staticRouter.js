import express from 'express'
import URL from '../models/url.js'
import { restrictTo } from '../middleware/auth.js';
const router = express.Router();

router.get('/admin/urls' , restrictTo(["ADMIN"]) ,async(req,res) =>{
    const allurls = await URL.find({})
    res.render("home" , {
        urls :allurls    
    })
}) 


router.get('/',restrictTo(["NORMAL","ADMIN"]),async(req,res) =>{
    const allurls = await URL.find({ createdBy : req.user._id})
    res.render("home" , {
        urls :allurls    // to show all urls on the home page when we visit '/'
    })
})

router.get("/signup" , (req,res) => {
    res.render("signup")
})

router.get("/login" , (req,res) => {
    res.render("login")
})

export default router