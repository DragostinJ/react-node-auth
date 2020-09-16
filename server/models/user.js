const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

//Define Model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

//On save hook, encrypt password
//before saving a model,(pre.("save")) run this function
userSchema.pre("save", function (next) {
  // getting access to user model
  const user = this;  //user.email or user/password

  //generate a salt - takes time so we pass callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    //hash/encrypt the password using the salt + time + callback
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }
      //overrite plain text password with encrypted password
      user.password = hash;
      // we are done, save the model
      next();
    });
  });
});

//Create Model Class
const ModelClass = mongoose.model("user", userSchema);

//Export the Model
module.exports = ModelClass;
