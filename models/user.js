var mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');


UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model("User", UserSchema);