const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const todoSchema = new Schema({
  title:  String,
  description: String,
},{
  timestamps: true,
  versionKey: false
});

const todoModel = mongoose.model('Todo', todoSchema);
module.exports = todoModel;