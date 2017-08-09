/**
 * Created by Sharmo on 8/7/2017.
 */


(function () {

    // var mongoose = require("mongoose");
    var websiteSchema = require("./website.schema.server");
    var db = require("./../database");
    var websiteModel = db.model("WebsiteModel", websiteSchema);

    websiteModel.createWebsiteForUser = createWebsiteForUser;
    websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
    websiteModel.findWebsiteById = findWebsiteById;
    websiteModel.updateWebsite = updateWebsite;
    websiteModel.deleteWebsite = deleteWebsite;
    module.exports = websiteModel;
    
    function createWebsiteForUser(userId, website) {
        return websiteModel.create(website);
    }
    
    function findAllWebsitesForUser(userId) {
        var websites =  websiteModel.find({_user : userId});
        return websites;
    }
    
    function findWebsiteById(websiteId) {
        return websiteModel.findById(websiteId);
    }
    
    function updateWebsite(websiteId, website) {
        return websiteModel.update({_id: websiteId},
            {$set: website});
    }
    
    function deleteWebsite(websiteId) {
        return websiteModel.remove({_id: websiteId});
    }

})();