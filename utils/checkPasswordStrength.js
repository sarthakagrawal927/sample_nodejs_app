function checkPasswordStrength(password, email){
    const userName = email.split('@')[0]
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const passwordHasUsername = password.includes(userName)
    const passwordFollowsPattern = strongRegex.test(password)
    console.log(password,email,!passwordHasUsername,passwordFollowsPattern)
    return !passwordHasUsername && passwordFollowsPattern
}

module.exports = checkPasswordStrength