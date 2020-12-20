var mongoose = require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema=new Schema({
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    state: String,
    blood: String,
    username: String,
    password: String,
    phone: String,
    email :{
        type: String,
        required: true,
        unique: true
    },
    aadhar: String,
    prescriptions: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Prescription"
        }
     ],
});


UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model("User", UserSchema);