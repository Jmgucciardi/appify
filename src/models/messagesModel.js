import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema ({
        from: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        },
        message_body: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    },

    {
        timestamps: true
})

messageSchema.pre('save', (next) => {
    this.channel = this.channel.toLowerCase()
    this.user = this.user.toLowerCase()
    next()
})

export default mongoose.model('Message', messageSchema);