import express from 'express'
import passport from 'passport'
import models from '../models'
import jwt from "jsonwebtoken"
import config from '../config'

const app = express()
const router = express.Router()

// register user route
router.post('/register', passport.authenticate('local-register'), (req, res) => {
    res.json(req.user)
})

// login route and generate jwt token
router.post('/authenticate', passport.authenticate('local-login'), (req, res) => {

    const payload = {
        user: req.user
    }

    app.set('appSecret', config.secret)

    let token = jwt.sign(payload, app.get('appSecret'), {
        expiresIn: 1400 // expires in 24 hours
    })


    req.user.local.online = true

    console.log('USER: ', req.user)
    console.log('TOKEN: ', token)

    res.json({
        success: true,
        user: req.user,
        token: token,
    })

})

// verify the token
router.use((req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token']

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('appSecret'), (err, decoded) => {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' })
            } else {
                // if everything is good, save to request for use in other routes
                console.log('VERIFY_TOKEN_API: SUCCESS')
                req.decoded = decoded
                next()
            }
        })

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        })
    }
})

router.post('/logout', (req, res) => {
    if (!req.user) return res.status(500).json({error: true})

    req.logout()
    res.json({success: true})
})

router.get('/users', (req, res) => {
    if (!req.user) return res.status(401).end()

    models.User.find({}, {'local.username': 1, 'local.online': 1, _id: 0}, (err, users) => {
        if (err) {
            return res.status(500).json({error: true})
        }

        res.json(users)
    })
})

router.get('/username/:username', (req, res) => {
    req.params.username = req.params.username.toLowerCase();

    models.User.findOne({'local.username': req.params.username}, (err, user) => {
        if (err) {
            return res.status(500).json({error: true});
        }

        return res.json({alreadyInUse: !!user })
    })
})

router.get('/user/channels', (req, res) => {
    if (!req.user) return res.status(401).end()

    models.User.findOne({'local.username': req.user}, {'local.channels': 1, _id: 0}, (err, channels) => {
        if (err) {
            return res.status(500).json({error: true})
        }

        res.json(channels)
    })
})

router.get('/channel/:name/messages', (req, res) => {
    if (!req.user) return res.status(401).end()

    req.params.name = req.params.name.toLowerCase()

    models.User.findOne({'local.username': req.user, 'local.channels': req.params.name}).exec()
        .then(user => {
            if (user) {
                return models.Message.find({channel: req.params.name}).exec()
            } else {
                throw 'Not joined to channel.'
            }
        })
        .then(messages => res.json(messages))
        .then(null, error => {
            res.status(401).json({error: error})
        })
})

export default router