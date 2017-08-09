/**
 * Created by Sharmo on 8/7/2017.
 */

(function () {
    // var mongoose = require("mongoose");
    var db = require("./../database");
    var websiteSchema = db.Schema({
        _user: String,
        name: String,
        description: String,
        pages: [],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "website"});
    module.exports = websiteSchema;
})();