import express from 'express'
import passport from 'passport'
import models from '../models'
import jwt from "jsonwebtoken"
import config from '../config'

const app = express()
const router = express.Router()

router.post('/register', passport.authenticate('local-register'), (req, res) => {
    res.json(req.user)
})

router.post('/authenticate', passport.authenticate('local-login'), (req, res) => {
    const payload = {
        user: req.user
    }

    app.set('appSecret', config.secret)

    let token = jwt.sign(payload, app.get('appSecret'), {
        expiresIn: 1400 // expires in 24 hours
    })

    console.log('TOKEN: ', token)

    res.json({
        success: true,
        user: req.user,
        token: token,
    })

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