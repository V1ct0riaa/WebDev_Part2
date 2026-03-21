const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError')

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
    }

    // res.send('SORRY YOU NEED A PASSWORD')
    throw new AppError('Password Required!', 401)
    
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

app.get('/admin', (req,res) => {
    throw new AppError("You're not an admin",403)
})

app.get('/error', (req,res) =>{
    fly()
})

app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})

// app.use((err, req, res, next) =>{
//     console.log('***************')
//     console.log('*******ERROR***')
//     console.log('***************')
//     // res.status(500).send('OH BOY ERROR')
//     next(err)
// })

app.use((err, req, res, next) =>{
    const {status = 500, message = 'Something Went Wrong'} = err
    res.status(status).send(message)
})




app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})