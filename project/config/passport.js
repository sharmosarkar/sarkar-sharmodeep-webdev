/**
 * Created by Sharmo on 8/13/2017.
 */


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require("../model/user/userModel.server");
// var User = mongoose.model('user_musichub');

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done) {

        User.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            // Return if user not found in database
            if (!user) {
                return done(null, false, {
                    message: 'User not found'
                });
            }
            // Return if password is wrong
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Password is wrong'
                });
            }
            // If credentials are correct, return the user object
            return done(null, user);
        });
    }
));