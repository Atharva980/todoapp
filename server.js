const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const app = require('./app')


// const DB = process.env.DATABASE
const DB = "mongodb+srv://atharva980:cluster0@cluster0.gqfxf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected With DataBase..!")
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`App running on Port ${PORT}, View Page on http://127.0.0.1:${PORT}/landing`)
})