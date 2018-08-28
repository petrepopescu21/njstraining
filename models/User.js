var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  age: Number,
  email: String
});

var User = mongoose.model("User", userSchema);

module.exports = User;
