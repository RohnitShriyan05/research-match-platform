const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  Username:{type: String, required: true},
  Password:{type: String, required:true},
  Role: {type: String, enum:["Student", "Professor"], required:true},
  Email: {type: String, required: true},
  Interests: [],
  ResumeLink: {type:String, required: false}
});
module.exports = mongoose.model("UserModel", UserSchema);