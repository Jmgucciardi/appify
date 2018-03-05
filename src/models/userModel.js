import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', (next) => {
    this.username = this.username.toLowerCase()
    next()
})

UserSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}


UserSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', UserSchema)