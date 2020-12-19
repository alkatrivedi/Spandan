const express=require("express");
const passport = require("passport");
const router=express.Router({mergeParams:true});
const catchAsync=require("../utils/catchAsync");
const User = require("../models/user");

router.get("/", (req, res)=>{
    res.render("../views/home");
});

 //INDEX - show all users
 router.get("/user", (req, res)=>{
     User.find({}, (err, allUsers)=>{
         if(err){
             console.log(err);
         } else {
             res.render("user", {users: allUsers});
         }
     });
 });


 router.get("/login", function(req, res) {
    res.render("login", {page: 'login'}); 
 });
 // app.post("/login", middleware, callback);
//  router.post("/login", passport.authenticate("local", {
//          successRedirect: "/campgrounds",
//          failureRedirect: "/login"
//      }),function(req,res){
//  });

router.get("/register",(req,res)=>{
    res.render("../views/register");
});

 router.post("/register",async(req,res,next)=>{
     try{
     const{firstName, lastName, address, city, state, blood, username, password, phone, email, aadhar} = req.body;
     var err;
     const user=new User({firstName, lastName, address, city, state, blood, username, phone, email, aadhar});
     const registeredUser = await User.register(user,password);
     req.login(registeredUser,err=>{
        if(err) return next(err);
        req.flash("success","Welcome to Spandan Hospital");
        res.redirect("user");
     })
     } catch(e){
         req.flash("error","This username is already registered");
         res.redirect("register");
     }
    // const{firstName, lastName, address, city, state, blood, username, password, phone, email, aadhar} = req.body;
    // res.render("../views/login.ejs");
});

 /*router.post("/register",function(req,res){
     User.register(new User({username: req.body.username}),req.body.password,function(err,user){
 		if(err){
 			req.flash("error",err.message);
 			res.render("../views/register");
 		}
 		passport.authenticate("local")(req,res,function(){
 			req.flash("success","Signed up successfully! Welcome to Spandan Hospital " + user.firstname);
 			res.redirect("/user");
 		});
        
    });
 });*/



/*router.post("/login",passport.authenticate("local",{failureFlash:true, failureRedirect: "/login"}),(req,res)=>{
    req.flash("success","Welcome Back!!!");
    res.redirect("/");
});*/

router.post("/login",passport.authenticate("local",
	{
        successRedirect: "/",
		failureRedirect: "/login"
	}),function(req,res){
        req.flash("success","Welcome Back!!!");
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/');
});

module.exports=router;