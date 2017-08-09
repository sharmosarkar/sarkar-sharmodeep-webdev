/**
 * Created by Sharmo on 8/7/2017.
 */


/**
 * Created by Sharmo on 8/7/2017.
 */


/**
 * Created by Sharmo on 8/7/2017.
 */


(function () {

    // var mongoose = require("mongoose");
    var widgetSchema = require("./widget.schema.server");
    var db = require("./../database");
    var widgetModel = db.model("WidgetModel", widgetSchema);

    widgetModel.createWidget = createWidget;
    widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
    widgetModel.findWidgetById = findWidgetById;
    widgetModel.updateWidget = updateWidget;
    widgetModel.deleteWidget = deleteWidget;
    widgetModel.reorderWidget = reorderWidget;
    module.exports = widgetModel;
    
    function createWidget(pageId, widget) {
        widget._page = pageId;
        return widgetModel.create(widget);
    }

    function findAllWidgetsForPage(pageId) {
        return widgetModel.find({_page : pageId});
    }

    function findWidgetById(widgetId) {
        return widgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        return widgetModel.update({_id: widgetId},
            {$set: widget});
    }

    function deleteWidget(widgetId) {
        return widgetModel.remove({_id: widgetId});
    }

    function reorderWidget(pageId, start, end) {

    }



})();