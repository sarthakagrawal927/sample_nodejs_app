const express = require("express")
const router = express.Router()
const User = require("./../models/User")

router.post("/",
        async(req,res)=>{
            try{
                await User.deleteMany()
                res.status(201).json({"Success": true})
            }
            catch(err){
                console.log(err.message)
                res.status(400).json({"Success" : false})
            }
        }
)

module.exports = router