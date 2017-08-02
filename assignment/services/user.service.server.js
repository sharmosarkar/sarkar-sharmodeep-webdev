/**
 * Created by Sharmo on 7/30/2017.
 */


(function () {
    var app = require("../../express");
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];


// html handlers
    app.get("/api/users", getAllUsers);
    app.get("/api/users/:userId", getUSerById);     // path parameter (not a query parameter)
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user", findUserByUsername);
    app.post("/api/user", createUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function getAllUsers(req, response) {
        response.send(users);
    }

    function getUSerById(req, response) {
        for (var u in users){
            if (users[u]._id === req.params.userId){
                response.send(users[u]);
            }
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            for(var u in users) {
                var _user = users[u];
                if(_user.username === username && _user.password === password) {
                    res.send(_user);
                    return;
                }
            }
        } else if(username) {
            for(var u in users) {
                if(users[u].username === username) {
                    res.send(users[u]);
                    return;
                }
            }
        }
        res.send("0");
    }
    
    function findUserByUsername(req, res) {
        var username = req.query.username;
        if (username){
            for(var u in users) {
                var _user = users[u];
                if(_user.username === username) {
                    res.send(_user);
                    return;
                }
            }
        }
        res.send("0");
    }


    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime() + "";
        users.push(user);
        res.send(user);
        return;
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        for(var u in users) {
            if(users[u]._id === userId) {
                users[u] = user;
                res.send(user);
                return res;
            }
        }
        res.sendStatus(404);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        for(var u in users) {
            if(users[u]._id === userId) {
                users.splice(u, 1);
                res.send(users[u]);
                return res;
            }
        }
        res.sendStatus(404);
    }

})();

