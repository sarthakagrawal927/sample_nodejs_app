const express = require("express")
const router = express.Router()
const User = require("./../models/User")

router.post("/",
        async(req,res)=>{
            try{
                await User.deleteMany()
                res.status(200).json({"success": true})
            }
            catch(err){
                console.log(err.message)
                res.status(400).json({"success" : false})
            }
        }
)

module.exports = router