const assert = require("assert")
const checkPasswordStrength = require("./../utils/checkPasswordStrength")

describe("Test checkPasswordStrength Function", () => {
    beforeEach(()=>{
        console.log("Testing....")
    })

    it("Is making sure of substring case", ()=>{
        assert.equal(checkPasswordStrength("#AbCd4ijsd", "AbCd4@gmail.com"), false)
        assert.equal(checkPasswordStrength("#AbCd4ijsd", "AbC1d4@gmail.com"), true)
    })

    it("Making sure password has 1 uppercase, 1 lowercase, 1 number, 1 special character & min 8 length", ()=>{
        assert.equal(checkPasswordStrength("#AbCd4", "sarthak@gmail.com"), false)
        assert.equal(checkPasswordStrength("#AbCdijsd", "sarthak@gmail.com"), false)
        assert.equal(checkPasswordStrength("AbCdijsd", "sarthak@gmail.com"), false)
        assert.equal(checkPasswordStrength("#Avdfsdj", "sarthak@gmail.com"), false)
        assert.equal(checkPasswordStrength("#AbCd3ijsd", "sarthak@gmail.com"), true)
    })
})