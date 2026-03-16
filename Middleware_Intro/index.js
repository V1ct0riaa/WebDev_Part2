const express = require('express');
const app = express();
const morgan = require('morgan');

// loggin information about req,res
app.use(morgan('tiny')); // tell me app to use morgan everytime there's a request

app.use((req, res, next) => {
    req.requestTime = Date.now()
    console.log(req.method, req.path)
    next()
})

// only runs if the path of incoming request /dogs runs
app.use('/dogs', (req, res, next) => {
    console.log('I LOVE DOGS')
    next()
})

const verifyPassword = ((req, res, next) => {
    const { password } = req.query
    if (password === 'chickennugget') {
        next()
    } else {
        res.send('SORRY YOU NEED A PASSWORD')
    }
})




// app.use((req,res,next) =>{
//     console.log('THIS IS MY FIRST MIDDLEWARE')
//     return next() // we need this to move on to the next line
//     console.log('THIS IS MY FIRST MIDDLEWARE AFTER NEXT()')

// })

// app.use((req,res,next) =>{
//     console.log('THIS IS MY SECOND MIDDLEWARE')
//     return next()
// })

// app.use((req,res,next) =>{
//     console.log('THIS IS MY THIRD MIDDLEWARE')
//     return next()
// })


app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('HOMEPAGE')
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('WOOF WOOF')
})

// verifyPassword is our middleware
app.get('/secret', verifyPassword, (req,res,next) =>{
    res.send('MY SECRET IS: SOMETIMES I WEAR HEADPHONES ON PUBLIC SO THAT I WONT TALK TO ANYONE')
})

app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})


app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})