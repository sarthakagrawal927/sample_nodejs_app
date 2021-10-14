const mongoose = require("mongoose")
const MONGO_URI = "mongodb://mongo:ek0ok0MMVdw9cBrlwkFX@containers-us-west-8.railway.app:6346"

const connectDB = async() =>{
    try{
        await mongoose.connect(MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology:true
        })
        console.log("Database successfully connected")
    }
    catch(err){
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectDB