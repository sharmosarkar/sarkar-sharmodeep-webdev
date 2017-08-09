/**
 * Created by Sharmo on 8/7/2017.
 */


/**
 * Created by Sharmo on 8/7/2017.
 */


(function () {

    // var mongoose = require("mongoose");
    var pageSchema = require("./page.schema.server");
    var db = require("./../database");
    var pageModel = db.model("PageModel", pageSchema);

    pageModel.createPage = createPage;
    pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
    pageModel.findPageById = findPageById;
    pageModel.updatePage = updatePage;
    pageModel.deletePage = deletePage;
    module.exports = pageModel;
    
    function createPage(websiteId, page) {
        page._website = websiteId;
        return pageModel.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        var pages =  pageModel.find({_website : websiteId});
        return pages;
    }

    function findPageById(pageId) {
        return pageModel.findById(pageId);
    }

    function updatePage(pageId, page) {
        return pageModel.update({_id: pageId},
            {$set: page});
    }

    function deletePage(pageId) {
        return pageModel.remove({_id: pageId});
    }

})();