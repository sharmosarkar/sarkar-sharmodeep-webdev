/**
 * Created by Sharmo on 8/7/2017.
 */

(function () {
    // var mongoose = require("mongoose");
    var db = require("./../database");
    var pageSchema = db.Schema({
        _website: String,
        name: String,
        title: String,
        description: String,
        widgets: [],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "page"});
    module.exports = pageSchema;
})();
