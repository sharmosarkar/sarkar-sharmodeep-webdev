/**
 * Created by Sharmo on 7/24/2017.
 */

(function () {
    angular
        .module("WamApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, widgetService, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.wgid = $routeParams.wgid;

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function init() {
            widgetService
                .findWidgetById(model.wgid)
                .then(function (response) {
                    model.widget = response.data;
                });
        }
        init();
        
        function updateWidget(widgetId, widget) {
            widgetService.updateWidget(widgetId, widget);
            $location.url('user/'+model.userId+'/website/'+model.wid+'/page/'+model.pid+'/widget');
        }
        
        function deleteWidget(wigetId) {
            widgetService.deleteWidget(wigetId);
            $location.url('user/'+model.userId+'/website/'+model.wid+'/page/'+model.pid+'/widget');
        }
    }
})();
