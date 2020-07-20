var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


router.get('/new', middleware.isLoggedIn,function(req,res) {
    
    Campground.findById(req.params.id, function(err, campground){
    	if(err)
    		console.log(err);
    	else
    		res.render("comments/new", {campground: campground});
    });
});

router.post('/', middleware.isLoggedIn,function(req,res) {
    Campground.findById(req.params.id, function(err, campground) {
    	if(err)
    		console.log(err);
    	else
    	{
    		Comment.create(req.body.comment, function(err, comment){
    			if(err)
    				console.log(err);
    			else
    			{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
    				campground.comments.push(comment);
    				campground.save();
    				res.redirect("/campgrounds/" + req.params.id);
    			}
    		});
    	}
    });
});

//edit form for editing comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    var campground_id = req.params.id;
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err)
            console.log(err);
        else
            res.render('comments/edit', {comment: foundComment, campground_id:campground_id});
    });
});

//update route for comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err)
            console.log(err);
        else
        {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE ROUTE FOR COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err)
            res.redirect("back");
        else
        {
            req.flash("success", "Comment deleted Successfully");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;