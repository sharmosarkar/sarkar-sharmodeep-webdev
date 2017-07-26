// /**
//  * Created by Sharmo on 7/24/2017.
//  */
//
// console.log("Hello from the server side app.js !!! ");
//
// var app = require("../express");
//
// var users = [
//     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
//     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
//     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
//     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
// ];
//
//
// // html handlers
// app.get("/api/users", getAllUsers);
// app.get("/api/users/:userId", getUSerById);     // path parameter (not a query parameter)
//
//
// function getAllUsers(req, response) {
//     response.send(users);
// }
//
// function getUSerById(req, response) {
//     for (var u in users){
//         if (users[u]._id === req.params.userId){
//             response.send(users[u]);
//         }
//     }
// }