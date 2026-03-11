const express = require('express')
const app = express()

// all incoming request coming here
// req = request (text information)
// res = response
// app.use((req, res) => {
//     console.log("we got new req")
//     // res.send('<h1>This is my webpage!</h1>')
// })

// root route
app.get('/', (req, res) => {
    res.send('This is the homepage!!!')
})

// use ':' to destinate the route
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params // params mean parameter
    res.send(`<h1> Browsing the ${subreddit} subreddit`)
})

// use ':' to destinate the route
app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params // params mean parameter
    res.send(`<h1> Viewing PostID : ${postId} on ${subreddit} subreddit`)
})

app.post('/cats', (req, res) => {
    res.send("THIS IS POST")
})

app.get('/cats', (req, res) => {
    res.send('Meow')
})

app.get('/dogs', (req, res) => {
    res.send('Woof')
})

app.get('/search', (req, res) => {
    const { q } = req.query
    if (!q) {
        res.send("NOTHING FOUND")
    }
    res.send(`<h1> Search result for ${q} </h1>`)
})

// always put this route on the bottom
app.get('/*', (req, res) => {
    res.send(`I don't know that path`)
})

// /r/SOMETHINGHERE



// /cats => 'meow'
// /dogs => 'woof'
// '/' => homepage

app.listen(3000, () => {
    console.log("Listening on port 3000")
})