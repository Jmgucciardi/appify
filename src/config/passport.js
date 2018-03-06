import User from '../models/userModel'
import jwt from 'jsonwebtoken'

const LocalStrategy = require('passport-local').Strategy
const secret = process.env.secret

module.exports = (config, passport) => {
    passport.use('local-signup', new LocalStrategy({
            username_Field: 'username',
            password_field: 'password',
            email_field: 'email',
            passReqToCallback: true,
        },
        (req, username, password, done) => {
            User.findOne({'user.username': username.toLowerCase()}, (err, user) => {
                if (err) {
                    return done(err)
                }
                if (user) {
                    return done(null, false)
                }
                const newUser = new User()

                newUser.user.username = username.toLowerCase()
                newUser.user.password = newUser.generateHash(password)
                newUser.user.channels = [config.defaultChannel.toLowerCase()]
                newUser.save((err, user) => {
                    if (err) {
                        throw err
                    }
                    return done(null, newUser);
                })
            })
        }))

    passport.use('local-login', new LocalStrategy({
            username_Field: 'username',
            password_Field: 'password',
            email_Field: 'email',
            passReqToCallback: true
    },
        (req, res, username, password, done) => {
            User.findOne({'user.username': username.toLowerCase()}, (err, user) => {
                if (err) {
                    return done(err)
                }
                if (!user) {
                    return res.status(401).json({ message: 'Authentication failed. User not found.' });

                }
                if (!user.comparePassword(password)) {
                    return res.status(401).json({ message: 'Authentication failed. Wrong password'})
                }
                return res.json({token: jwt.sign({ email: user.email, username: user.username, _id: user._id}, secret )});
            })
        }))
}