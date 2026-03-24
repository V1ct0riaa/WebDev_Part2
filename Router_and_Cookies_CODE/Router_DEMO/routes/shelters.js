const express = require('express')
const router = express.Router()

router.get('/', (req,res) =>{
    res.send('All shelters')
})

router.post('/', (req,res) =>{
    res.send('Making a new shelter')
})

router.get('/:id', (req,res) =>{
    res.send(`Show shelter ${req.params.id}`)
})

router.get('/:id/edit', (req,res) =>{
    res.send(`Editting shelter ${req.params.id}`)
})

module.exports = router