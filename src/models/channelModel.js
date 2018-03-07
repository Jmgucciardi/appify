import mongoose from 'mongoose'

const channelSchema = mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        unique: true
    },
})

channelSchema.pre('save', (next) => {
    this.name = this.name.toLowerCase()
    next()
})

export default  mongoose.model('Channel', channelSchema);