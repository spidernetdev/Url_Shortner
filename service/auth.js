import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
const secretKey = process.env.SECRET_KEY

function setUser(user) {
  // sessionIdToUserMap.set(id,user)
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secretKey
  );
}

function getUser(token){                       // use id incase of session id 
    // return sessionIdToUserMap.get(id)
    if(!token) return null
    try{
        return jwt.verify(token,secretKey)
    }
    catch(error){
        return null
    }
}

export {setUser , getUser}