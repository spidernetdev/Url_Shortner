import User from '../models/user.js'
import { setUser, getUser } from "../service/auth.js";
import { v4 as uuidv4 } from 'uuid';

async function handleUserSignup (req, res){
    const {name , email , password} = req.body
    await User.create({
        name, 
        email,
        password
    })
    res.redirect("/")
}

async function handleUserLogin (req, res){
    const {email , password} = req.body
    const user = await User.findOne({email ,password})
    if (!user){return  res.render("login" , {error : "invalid email or password"})}
    const token = setUser(user)
    res.cookie("token", token)
    return res.redirect("/")
}

export {handleUserSignup , handleUserLogin}