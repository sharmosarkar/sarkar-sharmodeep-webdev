/**
 * Created by Sharmo on 7/31/2017.
 */
var request = require('request');



(function () {
    var headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer BQAhk_zVKTrLjiSnN_-YtyjTniGs0DscB26Ae4Uua1f0VQI660S05rdHLA5mTeLyXBTdkx6B6_E0yiQ_ZU7TtFO_60NQDyLfUwUBosw4Csyru0lxjs_boUImDMt-PA_pSdvoXMdZ'
    };

    var options = {
        url: 'https://api.spotify.com/v1/search?q=enrique&type=artist',
        headers: headers
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }

    request(options, callback);
})();



