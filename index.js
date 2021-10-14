const express = require("express")
const app = express()

const connectDB = require("./config/db")
connectDB()

const PORT = 3000
app.use(express.json())

app.get("/", (req,res)=>res.json("test success"))

app.use("/api/sign_in", require("./routes/signIn"))
app.use("/api/sign_up", require("./routes/signUp"))
app.use("/api/clean", require("./routes/clearState"))


app.listen(PORT, () => console.log(`Server started at ${PORT}`))
