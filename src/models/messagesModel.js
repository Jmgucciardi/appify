import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema ({
    created: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})

messageSchema.pre('save', (next) => {
    this.channel = this.channel.toLowerCase()
    this.user = this.user.toLowerCase()
    next()
})

export default mongoose.model('Message', messageSchema);