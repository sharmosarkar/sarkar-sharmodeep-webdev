/**
 * Created by Sharmo on 8/7/2017.
 */


(function () {

    // var mongoose = require("mongoose");
    var userSchema = require("./user.schema.server");
    var db = require("./../database");
    var userModel = db.model("UserModel", userSchema);

    userModel.createUser = createUser;
    userModel.findUserById = findUserById;
    userModel.updateUser = updateUser;
    userModel.findUserByCredentials = findUserByCredentials;
    userModel.deleteUserById = deleteUserById;
    module.exports = userModel;

    function findUserByCredentials(username, password) {
        return userModel.findOne({username: username, password: password});
    }

    function updateUser(userId, user) {
        return userModel.update({_id: userId},
            {$set: user});
    }

    function createUser(user) {
        return userModel.create(user);
    }

    function findUserById(userId) {
        return userModel.findById(userId);
    }
    
    function deleteUserById(userId) {
        return userModel.remove({_id: userId});
    }

})();