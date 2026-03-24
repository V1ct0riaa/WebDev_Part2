const express = require('express')
const app = express()


const cookieParser = require('cookie-parser')
app.use(cookieParser('thisismysecret'))

app.get('/greet', (req,res) =>{
    const {name = 'anonymous'} = req.cookies
    res.send(`HEY THERE ${name}`)
})

app.get('/setname', (req,res) =>{
    // sending back
    res.cookie('name', 'stevie chicks')
    res.cookie('animal', 'golden retriever')
    res.send('OKAY SENT U A COOKIE')
})

app.get('/getsignedcookies', (req,res) =>{
    res.cookie('fruit', 'grape', {signed: true})
    res.send('OK SIGNED YOUR FRUIT COOKIE')
})

app.get('/verifyFruit', (req,res) =>{
    console.log(req.cookies)
    console.log(req.signedCookies)
    res.send(req.signedCookies)
})

app.listen(3000, ()=>{
    console.log('SERVING')
})