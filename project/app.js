/**
 * Created by Sharmo on 7/24/2017.
 */

console.log("Hello from the PROJECT server side app.js !!! ");
var express = require('express');
var app = express.Router();
var userService = require("./services/userServices.server");
app.use("/api/musichub/user",userService);
var playlistService = require("./services/playlistService.server");
app.use("/api/musichub/playlist",playlistService);
var cacheService = require("./services/cacheService.server");
app.use("/api/musichub/cache",cacheService);

var session = require('client-sessions');

// app.use(session({
//     cookieName: 'session',
//     secret: 'random_string_goes_here',
//     duration: 30 * 60 * 1000,
//     activeDuration: 5 * 60 * 1000,
// }));

console.log("Hello from the PROJECT server side app.js !!! ");

module.exports = app;