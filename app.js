const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use('/api/auth', require('./routes/auth_routes'))

const PORT = process.env.PORT || 3000

async function start() {
    try{
        await mongoose.connect('mongodb+srv://Kremlejija:DOzlBIselhzrtp4y@cluster0.vhjz1.mongodb.net/app?retryWrites=true&w=majority',{
            useNewUrlParser: true
        })
        app.listen(PORT, ()=>{
            console.log(`Server started on port:${PORT}`)
        })
    }catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

start()
