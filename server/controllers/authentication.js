const User = require("../models/user");

exports.signup = function (req, res, next) {
  const email = req.body.email;

  const password = req.body.password;

  // TODO: more validation on email and password 

  if(!email || !password) {return res.status(422).send({error: 'You must provide a password and email'})}
  // See  if the user with the given email exist
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    
    // if a user with this email exist, return error

    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
      //422 bad data
    }
    // if user with email does not exist create and save user record
    const user = new User({
      email: email,
      password: password,
    });

    user.save(function (err) {
      if (err) {
        return next(err);
      }
      //respond to request indicatin the user was created
      res.json({success: true})
    });
  });
};
