const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("./../models/User")
const {check, validationResult} = require("express-validator")
const checkPasswordStrength = require("./../utils/checkPasswordStrength")

router.post("/", [
                    check("name","Valid name is required").not().isEmpty(), 
                    check("email","Valid email is required").not().isEmpty().isEmail(),
                    check("password","Please enter password of length 8 or above").isLength({min:8})
                ],
        async(req,res)=>{
            try{
                const errors = validationResult(req)
                if(!errors.isEmpty()){
                    throw new Error(errors.array()[0].msg);
                }

                let {name, email, password} = req.body;

                let user = await User.findOne({ email })
                if(user){
                    throw new Error("User already exists")
                }


                if(checkPasswordStrength(password,email) === false){
                    throw new Error("Password not strong enough")
                }

                const salt = await bcrypt.genSalt(10)
                
                password = await bcrypt.hash(password, salt)

                user = new User({name, email, password})
                await user.save()

                res.status(201).json({"success": true})
            }
            catch(err){
                console.log(err.message)
                res.status(400).json({"success" : false})
            }
        }
)

module.exports = router