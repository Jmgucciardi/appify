import express from 'express'
import next from 'next'
import path from 'path'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import passport from 'passport'
import compression from 'compression'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import logger from 'logger'
import config from './config'
import routes from './routes/index'


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

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejections: ', promise)
})

nextApp.prepare().then(() => {
    const app = express()

    app.use(helmet())
    // app.use(logger('dev'))

    app.use(compression())
    app.use(cookieParser())

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(cookieParser())

    app.use(passport.initialize())
    app.use(passport.session())


    passport.serializeUser((user, done) => {
        done(null, user.user.username)
    })

    passport.deserializeUser((username, done) => {
        done(null, username)
    })

    app.use('/', routes)

    app.get('*', (req, res) => {
        return handle(req, res)
    })


    // error handle
    //eslint-disable-next-line
    app.use('*', (err, req, res, next) => {
        return res.status(500).json({
            message: err.message
        })
    })

    app.listen(config.port, (err) => {
        if (err) {
            throw err
        }
        console.log('Server listening on Port: ', config.port)
    })
})