const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
 
const userSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  email : {type : String , required : true},
  password: { type: String, required: true },
  lastLogin : {type : Date, default : new Date()}
},{timeStamp : true});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next){
  if(!this.isModified)
    next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema);
module.exports = User;