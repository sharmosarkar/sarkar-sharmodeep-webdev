/**
 * Created by Sharmo on 7/24/2017.
 */


(function () {

    angular
        .module("WamApp")
        .factory("widgetService", widgetService);

    function widgetService($filter) {

        // data in service
        var widgets = [
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];

        var api =  {

            'createWidget' : createWidget,
            'findWidgetsByPageId' : findWidgetsByPageId,
            'findWidgetById' : findWidgetById,
            'updateWidget': updateWidget,
            'deleteWidget': deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            var wgid  = getNewWidgetId() + '';
            widget._id = wgid;
            widget.pageId = pageId;
            widgets.push(widget);
            return wgid;
        }

        function findWidgetsByPageId(pageId) {
            var widget_list = [];
            for (var u in widgets) {
                var _widget = widgets[u];
                if (_widget.pageId === pageId ) {
                    if (_widget.widgetType === "YOUTUBE"){
                        var transformed_url = $filter('youtube_url_to_youtube_embed_url')(_widget.url);
                        _widget.url = transformed_url;
                    }
                    widget_list.push(_widget);
                }
            }
            return widget_list;
        }

        function findWidgetById(widgetId) {
            for (var u in widgets) {
                var _widget = widgets[u];
                if (_widget._id === widgetId){
                    return _widget;
                }
            }
        }

        function updateWidget(widgetId, widget) {
            for (var u in widgets) {
                var _widget = widgets[u];
                if (_widget._id === widgetId) {
                    _widget = widget;
                }
            }
        }

        function deleteWidget(widgetId) {
            for (var u in widgets) {
                var _widget = widgets[u];
                if (_widget._id === widgetId) {
                    widgets.splice(u, 1);
                }
            }
        }

        function getNewWidgetId (){
            var total_existing_widgets = parseInt(widgets.length-1);
            var last_id = parseInt(widgets[total_existing_widgets]._id);
            return (total_existing_widgets+last_id+9);

        }

    }

})();