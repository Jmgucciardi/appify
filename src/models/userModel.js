import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    user : {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        online: {
            type: Boolean,
            default: false
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
})

UserSchema.pre('save', function(next) {
    this.user.username = this.user.username.toLowerCase()
    next()
})

UserSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

UserSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.user.password)
}

export default mongoose.model('User', UserSchema)