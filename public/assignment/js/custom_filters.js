/**
 * Created by Sharmo on 7/24/2017.
 */

( function () {
    angular.module("WamApp")
            .filter('youtube_url_to_youtube_embed_url', function($sce) {
                return function(input) {
                    var embed_url;
                    input += '';
                    var input_url_splitted = input.split('/');
                    embed_url = 'https://www.youtube.com/embed/'+input_url_splitted[input_url_splitted.length-1];
                    var trusted_url = $sce.trustAsResourceUrl(embed_url);
                    return trusted_url;
                }
            });
})();