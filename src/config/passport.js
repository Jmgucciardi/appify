const LocalStrategy = require('passport-local').Strategy
import User from '../models/userModel'

module.exports = (config, passport) => {

    passport.serializeUser((user, done) => done(null, user.local.username))
    passport.deserializeUser((username, done) => done(null, username))

    passport.use('local-register', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
        },
        (req, username, password, done) => {
            User.findOne({'local.username': username.toLowerCase()}, (err, user) => {
                if (err) {
                    return done(err)
                }
                if (user) {
                    return done(null, false)
                }
                const newUser = new User()

                newUser.local.username = username.toLowerCase()
                newUser.local.password = newUser.generateHash(password)
                newUser.local.channels = [config.defaultChannel.toLowerCase()]
                newUser.save((err, user) => {
                    if (err) {
                        throw err
                    }
                    return done(null, newUser);
                })
            })
        }))

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
    },
        (req, username, password, done) => {
        console.log('BODY: ', req.body)
            User.findOne({ 'local.username': username.toLowerCase() }, (err, user) => {
            console.log('USER: ', user)
                if (err) {
                console.log('LOGIN ERROR: ', err)
                    return done(err)
                }
                if (!user) {
                console.log('LOGIN ERROR: USER NOT FOUND!' )
                    return done(null, false)
                }
                if (!user.verifyPassword(password)) {
                console.log('LOGIN ERROR: PASSWORD DOES NOT MATCH!')
                    return done(null, false)
                }
                console.log('LOG IN SUCCESS!')
                return done(null, user)
            })
        }))
}
