/**
 * Created by Sharmo on 7/24/2017.
 */

(function () {
    angular
        .module("WamApp")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, widgetService, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;

        model.createWidget = createWidget;

        function init() {

        }
        init();

        function createWidget(widgetType) {
            var widget = {
                'type': ''
            };
            widget.type = widgetType;
             widgetService
                 .createWidget(model.pid, widget)
                 .then(function (response) {
                     model.wgid = response.data._id;
                     model.widget = response.data;
                     $location.url('user/'+model.userId+'/website/'+model.wid+'/page/'+model.pid+'/widget/'+model.wgid);
                 });
            // console.log(model.widget);
            // $location.url('user/'+model.userId+'/website/'+model.wid+'/page/'+model.pid+'/widget/'+model.wgid);
        }


    }
})();