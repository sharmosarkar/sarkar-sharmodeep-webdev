/**
 * Created by Sharmo on 7/30/2017.
 */

(function () {
    var app = require("../../express");
    var pageModel = require("../model/page/page.model.server");
    // data in service
    // var pages = [
    //     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    // ];


    // html handlers
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);     // path parameter (not a query parameter)
    app.post("/api/website/:websiteId/page", createPage);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function findAllPagesForWebsite(req, res){
        var websiteId = req.params.websiteId;

        pageModel.
            findAllPagesForWebsite(websiteId)
                .then(function (page) {
                    res.json(page);
                    return;
                }, function (err) {
                    res.sendStatus(404).send(err);
                    return;
                });
        return;

        // var all_pages = [];
        // for(var w in pages) {
        //     if(pages[w].websiteId === websiteId) {
        //         all_pages.push(pages[w]);
        //     }
        // }
        // res.json(all_pages);

    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            });

        // for(var w in pages) {
        //     if(pages[w]._id === req.params.pageId) {
        //         res.json(pages[w]);
        //         return;
        //     }
        // }
        // res.sendStatus(404);

    }

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params.websiteId;

        pageModel
            .createPage(websiteId, page)
            .then(function (website) {
                res.json(website);
            });

        // page.websiteId = websiteId;
        // page._id = (new Date()).getTime() + "";
        // pages.push(page);
        // res.json(page);
        // return;
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;

        pageModel
            .updatePage(pageId, page)
            .then(function (status) {
                res.json(status);
            }, function (err) {
                res.sendStatus(404).send(err);
            });

        // for(var u in pages) {
        //     if(pages[u]._id === pageId) {
        //         pages[u] = page;
        //         res.send(page);
        //         return res;
        //     }
        // }
        // res.sendStatus(404);
    }

    function deletePage (req, res) {
        var pageId = req.params.pageId;

        pageModel
            .deletePage(pageId)
            .then(function (status) {
                res.json(status);
            }, function (err) {
                res.sendStatus(404).send(err);
            });

        // for(var u in pages) {
        //     if(pages[u]._id === pageId) {
        //         pages.splice(u, 1);
        //         res.send(pages[u]);
        //         return res;
        //     }
        // }
        // res.sendStatus(404);
    }


})();