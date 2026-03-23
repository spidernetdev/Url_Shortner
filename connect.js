import mongoose from 'mongoose'

async function connectMongoDb(url){
    mongoose.connect(url)
    .then(()=> console.log("MongoDB connected"))
    .catch(err => console.log('mongo error', err))
}

export{connectMongoDb};
