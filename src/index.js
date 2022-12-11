const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const route = require('./route/route')

app.use(bodyParser.json())
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://projects94:E35tUpfux9D87GOj@cluster0.m1ousdd.mongodb.net/backend-task-1Database', {
    useNewUrlParser: true
}).then(() => console.log("MongoDb is connected")).catch(err => console.log(err))


app.use('/', route)
app.listen(process.env.PORT || 3000, () => { console.log(`server running on port ${process.env.PORT || 3000}`) })

