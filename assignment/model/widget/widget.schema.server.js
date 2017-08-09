/**
 * Created by Sharmo on 8/7/2017.
 */

(function () {
    // var mongoose = require("mongoose");
    var db = require("./../database");
    var widgetSchema = db.Schema({
        _page: String,
        type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "widget"});
    module.exports = widgetSchema;
})();