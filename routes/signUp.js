const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("./../models/User")

const {check, validationResult} = require("express-validator")

function checkPasswordStrength(password, email){
    const userName = email.split('@')[0]
    const passwordHasUsername = password.includes(userName)
    const passwordFollowsPattern = true
    return passwordHasUsername && passwordFollowsPattern
}

router.post("/", [
                    check("name","Valid name is required").not().isEmpty(), 
                    check("email","Valid email is required").not().isEmpty().isEmail(),
                    check("password","Please enter password of length 8 or above").isLength({min:8})
                ],
        async(req,res)=>{
            try{
                const errors = validationResult(req)
                if(!errors.isEmpty()){
                    throw new Error(errors.array()[0]);
                }

                let user = await User.findOne({ email })
                if(user){
                    throw new Error("User already exists")
                }

                let {name, email, password} = req.body;

                if(checkPasswordStrength(password,email) === false){
                    throw new Error("Password not strong enough")
                }

                const salt = await bcrypt.genSalt(10)
                
                password = await bcrypt.hash(password, salt)

                user = new User({name, email, password})
                await user.save()

                res.status(201).json({"Success": true})
            }
            catch(err){
                console.log(err.message)
                res.status(400).json({"Success" : false})
            }
        }
)

module.exports = router