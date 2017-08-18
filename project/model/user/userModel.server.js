/**
 * Created by sharmo on 8/11/17.
 */


(function () {

    // var mongoose = require("mongoose");
    var userSchema = require("./userSchema.server");
    var Q = require("q");
    var db = require("./../../model/database_project");
    var userModel_project = db.model("userModel_project", userSchema);
    console.log('loading user model');
    userModel_project.createUser = newUSer;
    userModel_project.findUserById = findUserById;
    userModel_project.updateUser = updateUser;
    userModel_project.findUserByCredentials = findUserByCredentials;
    userModel_project.deleteUserById = deleteUserById;
    userModel_project.findUserByUsername = findUserByUsername;
    userModel_project.findUserByFirstName = findUserByFirstName;
    userModel_project.findUserByLastName = findUserByLastName;
    userModel_project.findAllUsers = findAllUsers;

    module.exports = userModel_project;

    function findAllUsers() {
        return userModel_project.find();
    }

    function findUserByCredentials(username, password) {
        return userModel_project.findOne({username: username, password: password});
    }

    function updateUser(userId, user) {
        return userModel_project.update({_id: userId},
            {$set: user});
    }

    function createUser(user) {
        return userModel_project.create(user);
    }

    function newUSer(user_ip){
        var user = new userModel_project({
            username: user_ip.username,
            firstName: user_ip.firstName,
            lastName: user_ip.lastName,
            email:  user_ip.email,
            phone:  user_ip.phone
        });
        var deferred = Q.defer();
        user.setPassword(user_ip.password);
        user.save(function(err, user) {
            if (err) {
                console.log(err);
                deferred.reject(new Error(err));
            } else if (user) {
                var token;
                token = user.generateJwt();
                deferred.resolve({
                    "username": user.username,
                    "token": token,
                    "_id":user._id,
                    "firstName":user.firstName,
                    "lastName":user.lastName,
                    "email":user.email,
                    "phone":user.phone,
                    "fav_artists": user.fav_artists,
                    "followers":user.followers,
                    "following":user.following
                });
            }
        });

        return deferred.promise;
    }

    function findUserById(userId) {
        return userModel_project.findById(userId);
    }

    function deleteUserById(userId) {
        return userModel_project.remove({_id: userId});
    }

    function findUserByUsername(username) {
        return userModel_project.find({username : username})
    }

    function findUserByFirstName(username) {
        return userModel_project.find({firstName : username})
    }

    function findUserByLastName(username) {
        return userModel_project.find({lastName : username})
    }



})();