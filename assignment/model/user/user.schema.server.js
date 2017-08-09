/**
 * Created by Sharmo on 8/7/2017.
 */

(function () {
    // var mongoose = require("mongoose");
    var db = require("./../database");
    var userSchema = db.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [],
        dateCreated: {type: Date, default: Date.now},
        isAdmin: Boolean
    }, {collection: "user"});
    module.exports = userSchema;
})();