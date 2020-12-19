var User =require("../models/user");
var middlewareObj = {};
// all middlewares goes here

middlewareObj.checkUserOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        User.findById(req.params.id, function(err, foundUser){
            if(err){
                req.flash("error","Campground not found");
                res.redirect("back");
            } else{
                //does own the repo
                console.log(foundCampground.author.id);
                console.log(req.user._id);
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You do not have permissions to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }    
}

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be looged in to do that");
    res.redirect("/login");
};

module.exports = middlewareObj;