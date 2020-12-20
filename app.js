const express                            = require("express"),      
      mongoose                           = require("mongoose"),
      flash                              = require("connect-flash"),
      passport                           = require("passport"),
      LocalStrategy                      = require("passport-local"),
      methodOverride                     = require("method-override"),
      bodyParser                         = require("body-parser");
     // Departments                        = require("./models/departments"),
     // Treatmentreceipt                   = require("./models/treatmentreceipt"),
     User                               = require("./models/user");

const userRoutes=require("./routes/users"); 


const app = express();
require('dotenv').config();



app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());

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
app.use(express.static(__dirname + "/public"));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "oh! bhaieee, kya majak ho rha hai ye????",
    resave: false,
    saveUninitialized: false
}));

app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    state: String,
    blood: String,
    username: String,
    password: String,
    phone: String,
    email: String,
    aadhar: String,
    prescriptions: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Prescription"
        }
     ],
});*/

 //var User = mongoose.model("User", userSchema);
 //prescription model
 var prescriptionSchema = new mongoose.Schema({
    doctorname: String,
    date: String,
    note: String,
});

var Prescription = mongoose.model("Prescription", prescriptionSchema);


app.use("/",userRoutes);

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

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/covid",(req,res)=>{
    res.render("covid");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res)=>{
    res.send("you hit the post route");
});


app.get("/register",(req,res)=>{
    res.render("register");
});


app.get("/prescription",(req,res)=>{
    res.render("prescription");
 });
 
 //INDEX - show all users
 app.get("/user", (req, res)=>{
     User.find({}, (err, allUsers)=>{
         if(err){
             console.log(err);
         } else {
             res.render("user", {users: allUsers});
         }
     });
 });
 
 //CREATE - add new user to the database
 app.post("/user", (req, res)=>{
     // get data from form and add to user array
     var firstName = req.body.firstName;
     var lastName = req.body.lastName;
     var address = req.body.address;
     var city = req.body.city;
     var state = req.body.state;
     var blood = req.body.blood;
     var username = req.body.username;
     var password = req.body.password;
     var phone = req.body.phone;
     var email = req.body.email;
     var aadhar = req.body.aadhar;
     var newUser = {
         firstName: firstName,
         lastName: lastName,
         address: address,
         city: city,
         state: state,
         blood: blood,
         username: username,
         password: password,
         phone: phone,
         email: email,
         aadhar: aadhar,
     };
     // users.push(newUser);
     //create new user and save to database
     User.create(newUser, (err, newlyCreated)=>{
         if(err){
             console.log(err);
         } else {
             //redirect to user page
             res.redirect("user");
         }
     });
 });
 
 // NEW - show form to create new user
 app.get("/user/new",(req,res)=>{
     res.render("register");
 });
 
 // SHOW - shows more info about one user
 app.get("/user/:id", (req, res)=>{
     //find the user with provided id
     User.findById(req.params.id).populate("prescriptions").exec((err, foundUser)=>{
         if(err){
             console.log(err);
         } else {
             //show template with that user
             res.render("patientProfile", {user: foundUser});
         }
     });
     
 });
 
 //==============doctor=======
 /*app.get("/doctorRegister",(req,res)=>{
     res.render("doctorRegister");
 });
 app.get("/doctorProfile",(req,res)=>{
     res.render("doctorProfile");
 });*/
 
 var doctorSchema = new mongoose.Schema({
     firstName: String,
     lastName: String,
     address: String,
     city: String,
     state: String,
     blood: String,
     department: String,
     specialization: String,
     age: String,
     username: String,
     password: String,
     phone: String,
     email: String,
     aadhar: String,
 });
 
 var Doctor = mongoose.model("Doctor", doctorSchema);
 
 app.get("/showDoctors", (req, res)=>{
     Doctor.find({}, (err, allDoctors)=>{
         if(err){
             console.log(err);
         } else {
             res.render("showDoctors", {doctors: allDoctors});
         }
     });
 });
 
 //CREATE - add new user to the database
 app.post("/showDoctors", (req, res)=>{
     // get data from form and add to user array
     var firstName = req.body.firstName;
     var lastName = req.body.lastName;
     var address = req.body.address;
     var city = req.body.city;
     var state = req.body.state;
     var blood = req.body.blood;
     var department = req.body.department;
     var specialization = req.body.specialization;
     var age = req.body.age;
     var username = req.body.username;
     var password = req.body.password;
     var phone = req.body.phone;
     var email = req.body.email;
     var aadhar = req.body.aadhar;
     var newDoctor = {
         firstName: firstName,
         lastName: lastName,
         address: address,
         city: city,
         state: state,
         blood: blood,
         department: department,
         specialization: specialization,
         age: age,
         username: username,
         password: password,
         phone: phone,
         email: email,
         aadhar: aadhar,
     };
     // users.push(newUser);
     //create new user and save to database
     Doctor.create(newDoctor, (err, newlyCreatedDoctor)=>{
         if(err){
             console.log(err);
         } else {
             //redirect to user page
             res.redirect("showDoctors");
         }
     });
 });
 
 // NEW - show form to create new user
 app.get("/showDoctors/new",(req,res)=>{
     res.render("doctorRegister");
 });
 
 // SHOW - shows more info about one user
 app.get("/showDoctors/:id", (req, res)=>{
     //find the user with provided id
     Doctor.findById(req.params.id, (err, foundDoctor)=>{
         if(err){
             console.log(err);
         } else {
             //show template with that user
             res.render("doctorProfile", {doctor: foundDoctor});
         }
     });
     
 });
 
 //======prescription==========
 

app.get("/user/:id/prescription/new", (req, res)=>{
    User.findById(req.params.id, function(err,foundUser){
        if(err){
            console.log(err);
        }else{
           res.render("prescription",{user: foundUser}); 
        }
    }
    );
});

//CREATE - add new prescription to the database
app.post("/user/:id/prescription", (req, res)=>{    
    User.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/user/"+ User._id);
        }else{
            Prescription.create(req.body.prescription, function(err,prescription){
                if(err){
                    //req.flash("Something went wrong");
                    console.log(err);
                }else{
                    /*var doctorname = req.body.doctorname;
                    var date = req.body.date;
                    var note = req.body.note;
                    var newPrescription={
                        doctorname: doctorname,
                        date: date,
                        note: note
                    }
                    //newPrescription.save();*/
                    User.prescriptions.push(prescription);
                    User.save();
                
                
                    req.flash("success","Successfully added comment");
                    res.redirect("/user/" + User._id);
                }
            });
        }
    });   
});

 
let port = process.env.PORT || 3000
app.listen(port, process.env.IP, function(){
    console.log("started!");
});