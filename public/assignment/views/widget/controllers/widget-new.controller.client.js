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
            console.log("FIRED !!");
        }
        init();

        function createWidget(widgetType) {
            var widget = {
                '_id':'',
                'widgetType': '',
                'pageId': '',
                'width': '',
                'url': '',
                'size': '',
                'text': ''
            };
            widget.widgetType = widgetType;
            model.wgid = widgetService.createWidget(model.pid, widget);
            console.log(model.widget);
            $location.url('user/'+model.userId+'/website/'+model.wid+'/page/'+model.pid+'/widget/'+model.wgid);
        }


    }
})();