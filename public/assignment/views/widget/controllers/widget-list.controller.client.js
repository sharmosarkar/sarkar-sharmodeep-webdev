/**
 * Created by Sharmo on 7/24/2017.
 */

(function () {
    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, widgetService, $sce) {
        var model = this;

        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;

        model.trustHTMLContent = trustHTMLContent;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pid);
            // console.log(model.widgets);
        }
        init();

        function trustHTMLContent(htmlContent) {
            return $sce.trustAsHtml(htmlContent);
        }
    }
})();