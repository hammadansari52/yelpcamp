var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		title: "Salmon Creek",
		image: "https://live.staticflickr.com/1172/907039443_eed6b86673_c_d.jpg",
		desc:  "blah blah blah blah blah"
	},
	{
		title: "Granite Hill",
		image: "https://live.staticflickr.com/1132/1175581131_f14f4aa168_c_d.jpg",
		desc:  "blah blah blah blah blah"
	},
	{
		title: "Mountain Goat's Rest",
		image: "https://live.staticflickr.com/4079/4899930254_1cb9583e76_c_d.jpg",
		desc:  "blah blah blah blah blah"
	}
];

function seedDB() {
	Campground.remove({}, function(err) {
		if(err)
			console.log(err);
		else
		{
			console.log("removed data");
			data.forEach(function(seed) {
				Campground.create(seed, function(err, campground) {
					if(err)
						console.log(err);
					else
					{
						console.log("Added data");
						Comment.create({
							text: "sdchbshdbcsdc sjdcbsdjc jsdcndj jdcnjd jdcn djcjnc jd  jdncj ",
							author: "Hammad Ansari"
						}, function(err, comment) {
							if(err)
								console.log(err);
							else
								campground.comments.push(comment);
								campground.save();
								console.log("Created a new comment");
								// console.log(campground);
						});
					}
				});
			});
		}
	});
}

module.exports = seedDB;