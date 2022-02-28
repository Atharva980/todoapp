const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('public'))
app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs')
app.use(express.json())

const uploadRoute = require('./routes/uploadRoute')
const downloadRoute = require('./routes/downloadRoute')

app.use('/landing',(req,res) => {
    res.status(200).render('upload')
})
app.use('/api/files',uploadRoute)
app.use('/files',downloadRoute)

module.exports = app