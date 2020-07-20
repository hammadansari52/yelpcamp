var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");
// var flash = require("connect-flash");

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if(req.isAuthenticated())
    {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if(foundCampground.author.id.equals(req.user._id))
            {
                next();
            }
            else
            {
                req.flash("error", "You are not authorized to do that!");
                res.redirect("back");
            }
        });
    }
    else
    {
        req.flash("error", "You must be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(foundComment.author.id.equals(req.user._id))
            {
                next();
            }
            else
            {
                req.flash("error", "You are not authorized to do that!");
                res.redirect("back");
            }
        });
    }
    else
    {
        req.flash("error", "You must be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated())
        return next();
    req.flash("error", "You must be logged in to do that!");
    res.redirect("/login");
}

module.exports = middlewareObj;