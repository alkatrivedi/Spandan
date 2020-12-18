const express                            = require("express"),      
      mongoose                           = require("mongoose"),
      passport                           = require("passport"),
      LocalStrategy                      = require("passport-local"),
      methodOverride                     = require("method-override"),
      bodyParser                         = require("body-parser")
     // Departments                        = require("./models/departments"),
     // Treatmentreceipt                   = require("./models/treatmentreceipt"),
     // User                               = require("./models/user")




const app = express();
require('dotenv').config();



app.use(bodyParser.urlencoded({extended: true}));

mongoose.set('useUnifiedTopology', true);
const url = process.env.MONGODB_URI || 3000

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}, () => {
    console.log("Connected");
});

app.set("view engine","ejs");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "oh! bhaieee, kya majak ho rha hai ye????",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
/*passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, User.authenticate()));*/


//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

app.get("/", (req,res)=>{
    res.render("home");
});

app.get("/aboutUs",(req,res)=>{
    res.render("aboutUs");
});

app.get("/departments",(req,res)=>{
    res.render("departments");
});

app.get("/bloodStorage",(req,res)=>{
    res.render("bloodStorage");
});

let port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("Listening to port 3000.");
});
