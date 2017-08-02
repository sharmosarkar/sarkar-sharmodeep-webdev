/**
 * Created by Sharmo on 7/24/2017.
 */


(function () {

    angular
        .module("WamApp")
        .factory("widgetService", widgetService);

    function widgetService($http, $filter) {


        var api =  {

            'createWidget' : createWidget,
            'findWidgetsByPageId' : findWidgetsByPageId,
            'findWidgetById' : findWidgetById,
            'updateWidget': updateWidget,
            'deleteWidget': deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            // var wgid  = getNewWidgetId() + '';
            // widget._id = wgid;
            // widget.pageId = pageId;
            // widgets.push(widget);
            // return wgid;
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget);
        }

        function findWidgetsByPageId(pageId) {
            // var widget_list = [];
            // for (var u in widgets) {
            //     var _widget = widgets[u];
            //     if (_widget.pageId === pageId ) {
            //         if (_widget.widgetType === "YOUTUBE"){
            //             var transformed_url = $filter('youtube_url_to_youtube_embed_url')(_widget.url);
            //             _widget.url = transformed_url;
            //         }
            //         widget_list.push(_widget);
            //     }
            // }
            // return widget_list;
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url)
                .then(function (response) {
                    // console.log(response.data);
                    var widgets =  response.data;
                    var widget_list = [];
                    for (var u in widgets) {
                        var _widget = widgets[u];
                        if (_widget.widgetType === "YOUTUBE") {
                            var transformed_url = $filter('youtube_url_to_youtube_embed_url')(_widget.url);
                            _widget.url = transformed_url;
                        }
                        widget_list.push(_widget);
                    }
                    return widget_list;
                });
        }

        function findWidgetById(widgetId) {
            // for (var u in widgets) {
            //     var _widget = widgets[u];
            //     if (_widget._id === widgetId){
            //         return _widget;
            //     }
            // }
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, widget) {
            // for (var u in widgets) {
            //     var _widget = widgets[u];
            //     if (_widget._id === widgetId) {
            //         _widget = widget;
            //     }
            // }
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
        }

        function deleteWidget(widgetId) {
            // for (var u in widgets) {
            //     var _widget = widgets[u];
            //     if (_widget._id === widgetId) {
            //         widgets.splice(u, 1);
            //     }
            // }
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }

        function getNewWidgetId (){
            var total_existing_widgets = parseInt(widgets.length-1);
            var last_id = parseInt(widgets[total_existing_widgets]._id);
            return (total_existing_widgets+last_id+9);

        }

    }

})();