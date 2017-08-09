/**
 * Created by Sharmo on 8/3/2017.
 */

// REF ::: http://www.netinstructions.com/simple-web-scraping-with-node-js-and-javascript/

var request = require('../vendor/request');
var cheerio = require('../vendor/cheerio');
var fs = require('fs');

// request("https://www.reddit.com", function(error, response, body) {
request("https://itunes.apple.com/us/artist/enrique-iglesias/id90895?ign-mpt=uo%3D4", function(error, response, body) {
    if(error) {
        console.log("Error: " + error);
    }
    console.log("Status code: " + response.statusCode);

    var $ = cheerio.load(body);

    // $('div#siteTable > div.link').each(function( index ) {
    //     var title = $(this).find('p.title > a.title').text().trim();
    //     var score = $(this).find('div.score.unvoted').text().trim();
    //     var user = $(this).find('a.author').text().trim();
    //     console.log("Title: " + title);
    //     console.log("Score: " + score);
    //     console.log("User: " + user);
    //     fs.appendFileSync('reddit.txt', title + '\n' + score + '\n' + user + '\n');
    // });

});