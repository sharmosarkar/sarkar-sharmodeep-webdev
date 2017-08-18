/**
 * Created by Sharmo on 8/7/2017.
 */

(function () {
    // var mongoose = require("mongoose");
    var db = require("../database_project");
    var crypto = require('crypto');
    var jwt = require('jsonwebtoken');
    console.log('loading user schema');
    var userSchema = db.Schema({
        id: db.Schema.Types.ObjectId,
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        playlists: [],
        followers: [],
        fav_artists : [],
        following: [],
        hash: String,
        salt: String,
        dateCreated: {type: Date, default: Date.now},
        isAdmin: Boolean
    }, {collection: "user_musichub"});

    userSchema.methods.setPassword = function(password) {
        //this.salt = crypto.randomBytes(16).toString('hex');
        this.salt = new Buffer(crypto.randomBytes(16).toString('hex'), 'binary');
        console.log('setPassword ' + password);
        // var pass = new Buffer(password, 'binary');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
    };

    userSchema.methods.validPassword = function(password) {
        // var pass = new Buffer(password, 'binary');
        // this.salt = new Buffer(crypto.randomBytes(16).toString('hex'), 'binary');
        console.log('validPassword ' + password);
        var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
        return this.hash === hash;
    };

    userSchema.methods.generateJwt = function() {
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);

        return jwt.sign({
            _id: this._id,
            username: this.username,
            exp: parseInt(expiry.getTime() / 1000)
        }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
    };


    module.exports = userSchema;
})();