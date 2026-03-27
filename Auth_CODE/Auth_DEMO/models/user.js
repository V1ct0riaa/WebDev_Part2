const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required : [true, 'Username cannot be empty!']
    },
    password:{
        type: String, 
        required : [true, 'Password cannot be empty!']
    },
})

userSchema.statics.findAndValidate = async function(username, password) {
    const foundUser = await this.findOne({ username })
    const isValid = bcrypt.compare(password, foundUser.password)
    return isValid? foundUser : false
}

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model('User', userSchema)