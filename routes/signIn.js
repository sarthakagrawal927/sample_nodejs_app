const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("./../models/User")

const {check, validationResult} = require("express-validator")

router.post("/", [
                    check("email","Valid email is required").not().isEmpty().isEmail(),
                    check("password","Please enter password of length 8 or above").isLength({min:8})
                ],
        async(req,res)=>{
            try{
                const errors = validationResult(req)
                if(!errors.isEmpty()){
                    throw new Error(errors.array()[0]);
                }

                let {email, password} = req.body;
                const user = await User.findOne({ email })
                if(!user){
                    throw new Error("User does not exists")
                }

                const isMatch = await bcrypt.compare(password, user.password)
                if(!isMatch){
                    throw new Error("Password incorrect")
                }

                res.status(200).json({"success": true})
            }
            catch(err){
                console.log(err.message)
                res.status(400).json({"success" : false})
            }
        }
)

module.exports = router