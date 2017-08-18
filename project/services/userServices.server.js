/**
 * Created by sharmo on 8/11/17.
 */


(function () {

    var express = require("express");
    var Q = require("q");
    var router = express.Router();
    var passport = require('passport');
    var userModel = require("../model/user/userModel.server");
    console.log('loading');
    // http handlers
    // router.use(function timeLog(req, res, next) {
    //     console.log('Time: ', Date.now());
    //     next();
    // });


    router.get("/all", getAllUsers);
    router.get("/username", findUserByUsername);
    router.get("/credentials", validateCredentials);
    router.get("/firstName", findUserByfirstname);
    router.get("/lastName", findUserBylastname);
    router.get("/:userId", getUSerById);// path parameter (not a query parameter)
    router.post("/createuser", createUser);
    router.put("/:userId", updateUser);
    router.delete("/:userId", deleteUser);



    function findUserByfirstname(req, res) {
        // console.log("Function called : findUserByUsername");
        var username = req.query.username;
        if (username) {
            userModel
                .findUserByFirstName(username)
                .then(function (user) {
                    res.json(user);
                }, function (err) {
                    res.send("0");
                })
        }
    }

    function findUserBylastname(req, res) {
        // console.log("Function called : findUserByUsername");
        var username = req.query.username;
        if (username) {
            userModel
                .findUserByLastName(username)
                .then(function (user) {
                    res.json(user);
                }, function (err) {
                    res.send("0");
                })
        }
    }

    function validateCredentials(req, res) {
        authenticate(req, res)
            .then(function(data){
                    // req.session.user = data;
                res.send(data);

            },
            function (err) {
                res.send(err);
            })
    }

    function getAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(function (data) {
                res.send(data);
            })
    }

    function getUSerById(req, response) {
        // console.log('in function    :   getUSerById');
        userModel
            .findUserById(req.params.userId)
            .then(function (user) {
                response.json(user);
            },function(error){
                console.log(error);
                response.send("0");
            });

    }

    function findUserByCredentials(req, res) {
        // console.log('in function    :   findUserByCredentials');
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            userModel
                .findUserByCredentials(username, password)
                .then(function (user) {
                    res.json(user);
                    return;
                }, function (err) {
                    res.sendStatus(404).send(err);
                    return;
                });
            return;
        }
        res.send("0");
    }

    function authenticate(req, res){

        var deferred = Q.defer();
        passport.authenticate('local', function(err, user, info) {
            var token;

            // If Passport throws/catches an error
            if (err) {
                console.log("EEEERRRRRPRRR !!");
                deferred.reject(new Error(err));
            }

            // If a user is found
            if (user) {
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
            } else {
                // If user is not found
                console.log(info);
                deferred.reject(new Error(info));
            }
        })(req, res);
        return deferred.promise;
    }


    function findUserByUsername(req, res) {
        // console.log("Function called : findUserByUsername");
        var username = req.query.username;
        if (username){
            userModel
                .findUserByUsername(username)
                .then(function (user) {
                    res.json(user);
                }, function (err) {
                    res.send("0");
                })
        }
    }


    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            });
    }


    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;

        userModel
            .updateUser(userId, user)
            .then(function (status) {
                res.json(status);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }


    function deleteUser(req, res) {
        var userId = req.params.userId;

        userModel
            .deleteUserById(userId)
            .then(function (status) {
                res.json(status);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    module.exports = router;
})();