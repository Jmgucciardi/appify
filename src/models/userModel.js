import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema ({
    local: {
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        channels: [
            {
                type: String
            },
        ],
        online: {
            type: Boolean,
            default: false
        },
        last_login: {
            type: Date,
            default: new Date()
        }
    },
})

UserSchema.pre('save', function(next) {
    this.local.username = this.local.username.toLowerCase()

    next()
})

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password)
}


export default mongoose.model('User', UserSchema)