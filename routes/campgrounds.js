var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get('/',function(req,res) {
    Campground.find({}, function(err, allCampgrounds) {
        if(err)
            console.log(err);
        else
            res.render("campgrounds/campgrounds", { campgrounds: allCampgrounds });
    });

});

router.post('/', middleware.isLoggedIn,function(req,res) {
    console.log(req.body);
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {title: name, image: image, desc:desc, author: author};
    Campground.create(newCampground, function(err, campground) {
        if(err)
            console.log(err);
        else
        {
            // console.log(campground);
            req.flash("success", "New Campground created");
            res.redirect("/campgrounds");
        }

    })
});

router.get('/new', middleware.isLoggedIn,function(req,res) {
    res.render("campgrounds/new");
});

router.get('/:id',function(req,res) {
    
    console.log(req.params.id);
    // res.render('show');
    Campground.findById(req.params.id).populate("comments").exec(function(err, reqCampground) {
        if(err)
            console.log(err);
        else
            res.render("campgrounds/show", { campground: reqCampground });
    });
});

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else
        {
            res.render("campgrounds/edit", {campground: foundCampground});
        }

    });
})

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err)
            console.log(err);
        else
        {
            req.flash("success", "Information Updated Successfully");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else
        {
            req.flash("success", "Successfully Deleted");
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;