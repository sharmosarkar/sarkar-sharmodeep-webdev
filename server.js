/**
 * Created by Sharmo on 7/30/2017.
 */


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// generic response
app.use(express.static(__dirname + '/public'));

require("./test/app");
require("./assignment/app.js");

var port = process.env.PORT || 3000;
app.listen(port);
