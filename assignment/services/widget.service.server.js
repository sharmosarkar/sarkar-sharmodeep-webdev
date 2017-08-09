/**
 * Created by Sharmo on 7/30/2017.
 */

(function () {
    var app = require("../../express");
    var widgetModel = require("../model/widget/widget.model.server");

    // var multer = require('multer'); // npm install multer --save
    // var upload = multer({ dest: __dirname+'/../../public/uploads' });

    // data in service
    // var widgets = [
    //     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    //     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    //         "url": "http://lorempixel.com/400/200/"},
    //     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    //     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    //         "url": "https://youtu.be/AM2Ivdi9c4E" },
    //     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    // ];


    // html handlers
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);     // path parameter (not a query parameter)
    app.post("/api/page/:pageId/widget", createWidget);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    // app.post ("/api/upload", upload.single('myFile'), uploadImage);


    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        widgetModel.
            findAllWidgetsForPage(pageId)
                .then(function (widget) {
                    res.json(widget);
                    return;
                }, function (err) {
                    res.sendStatus(404).send(err);
                    return;
                });
            return;

        // var widget_list = [];
        // for (var u in widgets) {
        //     var _widget = widgets[u];
        //     if (_widget.pageId === pageId ) {
        //         // if (_widget.widgetType === "YOUTUBE"){
        //         //     var transformed_url = $filter('youtube_url_to_youtube_embed_url')(_widget.url);
        //         //     _widget.url = transformed_url;
        //         // }
        //         widget_list.push(_widget);
        //     }
        // }
        // res.json(widget_list);
    }


    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            });

        // for(var w in widgets) {
        //     if(widgets[w]._id === req.params.widgetId) {
        //         res.json(widgets[w]);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pageId;

        widgetModel
            .createWidget(pageId, widget)
            .then(function (widget) {
                console.log(widget);
                res.json(widget);
            });

        // widget.pageId = pageId;
        // widget._id = (new Date()).getTime() + "";
        // widgets.push(widget);
        // res.json(widget);
        // return;
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;

        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (status) {
                res.json(status);
            }, function (err) {
                res.sendStatus(404).send(err);
            });

        // for(var u in widgets) {
        //     if(widgets[u]._id === widgetId) {
        //         widgets[u] = widget;
        //         res.send(widget);
        //         return res;
        //     }
        // }
        // res.sendStatus(404);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .deleteWidget(widgetId)
            .then(function (status) {
                res.json(status);
            }, function (err) {
                res.sendStatus(404).send(err);
            });

        // for(var u in widgets) {
        //     if(widgets[u]._id === widgetId) {
        //         widgets.splice(u, 1);
        //         res.send(widgets[u]);
        //         return res;
        //     }
        // }
        // res.sendStatus(404);
    }

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        widget = getWidgetById(widgetId);
        widget.url = '/uploads/'+filename;

        var callbackUrl   = 'user/'+userId+'/website/'+websiteId+'/page/'+pageId+'/widget';

        res.redirect(callbackUrl);
    }





})();