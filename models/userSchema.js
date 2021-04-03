const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const userSchema = new Schema({
  firstName:  String,
  lastName: String,
  email:  String,
  password: String,
  todos : [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
},{
  timestamps: true,
  versionKey: false
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;