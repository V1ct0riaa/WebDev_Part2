const bcrypt = require('bcrypt')

const hashPassword = async(pw) => {
    const hash = await bcrypt.hash(pw,12)
    console.log(hash)
}

const login = async(pw, hashedPw) =>{
    const result = await bcrypt.compare(pw, hashedPw)
    if (result) {
        console.log('LOGGED IN')
    } else { 
        console.log('TRY AGAIN')
    }
}

// hashPassword('monkey')
login('monkey', '$2b$12$uSyxOcEcn7U0bGvYvcWoIOKAaPPm8Fow57wCkYGuvLWoEzeW5tBVC')