/**
 * Created by Sharmo on 8/2/2017.
 */


console.log("Hello from Mongoose");

var mongoose = require('../vendors/mongoose');
var db = mongoose.connect('mongodb://localhost/test');

var userSchema = mongoose.Schema({
    username: String,
    first: String,
    last: String,
    dob: Date,
    status: {type: String, enum: ["MARRIED", "SINGLE"]}, // can only insert MARRIED and SINGLE
    created: {type: Date, default: Date.now}
}, {collection: "user"});

var userModel =  mongoose.model("UserModel", userSchema); // unique name registered in the database

// createUser({username: "bob"});

/// promises
findAllUsers().then(function (users) {
        console.log(users);
    });


function  createUser(user) {
    // always with create register a call back function
    userModel.create(user, function (err, doc){
        if (err){
            console.log(err);
        }
        else{
            console.log(doc);
        }
    });
}

function findAllUsers() {
    return userModel.find();
}


