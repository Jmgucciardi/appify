import express          from 'express'
import next             from 'next'
import path             from 'path'
import mongoose         from 'mongoose'
import bodyParser       from 'body-parser'
import passport         from 'passport'
import compression      from 'compression'
import helmet           from 'helmet'
import cookieParser     from 'cookie-parser'
import logger           from 'morgan'
import config           from './config'
import routes           from './routes'


const passportConfig = require('./config/passport')(config, passport)

const dev = process.env.NODE_ENV !== 'production'
mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URI || config.database)

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

// process.on('unhandledRejection', (reason, promise) => {
//     console.log('Unhandled Rejections: ', promise)
// })

nextApp.prepare().then(() => {
    const app = express()
    const server = require('http').Server(app)
    const io = require('socket.io')(server)


    const middlewares = [
        helmet(),
        logger('dev'),
        compression(),
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        passport.initialize(),
        passport.session(),
        cookieParser()
    ]

    middlewares.forEach(middleware => app.use(middleware))

    app.use('/', routes)


    const socketHandler = require('./socketEvents.js')(config, io)


    app.get('*', (req, res) => {
        return handle(req, res)
    })


    // error handle
    // eslint-disable-next-line
    app.use('*', (err, req, res, next) => {
        return res.status(500).json({
            message: err.message
        })
    })

    server.listen(config.port, (err) => {
        if (err) {
            throw err
        }
        console.log('Server listening on Port: ', config.port)
    })
})