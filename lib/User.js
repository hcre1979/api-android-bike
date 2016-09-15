var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  routes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'routes' }]
});

userSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, null, null, function (err, hash) {
    if (err) next();
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (attemptedPassword, callback) {
  var password = this.password;
  bcrypt.compare(attemptedPassword, password, function (err, isMatch) {
    return callback(isMatch);
  });
};

var User = mongoose.model('users', userSchema);

module.exports = User;
