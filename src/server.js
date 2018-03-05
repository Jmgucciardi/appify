import express from 'express'
import next from 'next'
import path from 'path'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import data from './ServerConfig'

const dev = process.end.NODE_ENV !== 'production'
mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URI || data.database)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('connection to database confirmed')
})

const nextApp = next({
    dev,
    dir: path.resolve(__dirname)
})

const handle = nextApp.getRequestHandler()

process.on('unhandled Rejections', (reason, promise) => {
    console.log(promise)
})

nextApp.prepare().then(() => {
    const app = express()

    app.use(bodyParser())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.get('*', (req, res) => {
        return handle(req, res)
    })

    app.use('*', (err, req, res, next) => {
        return res.status(500).json({
            message: err.message
        })
    })

    app.listen(data.port, (err) => {
        if (err) {
            console.log('Error: ', err)
        }
        console.log('Server listening on Port: ', data.port)
    })
})