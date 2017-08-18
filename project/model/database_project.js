/**
 * Created by Sharmo on 8/7/2017.
 */

(function () {

    var q = require('q');
    console.log('loading database boiler plate');
    // var connectionString = 'mongodb://127.0.0.1:27017/wamapp'; // for local
    var connectionString = 'mongodb://localhost/musichub';
    if (process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
        var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
        var password = process.env.MLAB_PASSWORD_WEBDEV;
        connectionString = 'mongodb://' + username + ':' + password;
        connectionString += '@ds151752.mlab.com:51752/heroku_g42rvh5d'; // user yours
    }

    var mongoose = require("mongoose");
    var db = mongoose.connect(connectionString);
    mongoose.Promise = q.Promise;
    module.exports = db;

})();