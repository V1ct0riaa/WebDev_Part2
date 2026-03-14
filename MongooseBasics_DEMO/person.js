const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
    .then(() => {
        console.log('Connection Open!')
    })
    .catch(err => {
        console.log('Oh No Error')
        console.log(err)
    })

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

// we can call the virtual method and then the setter & getter
personSchema.virtual('fullName').get(function(){
    return `${this.first} ${this.last }`
})

personSchema.pre('save', async function(){
    this.first = 'Yo'
    this.last = 'Mama'
    console.log('ABOUT TO SAVE')
})

personSchema.post('save', async function(){
    console.log('JUST SAVED')
})

// make the Person model
const Person = mongoose.model('Person', personSchema)
