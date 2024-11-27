const mongoose = require('mongoose')

const tutorialSchema = new mongoose.Schema({
title:{
  type: String,
  required: [true, "Title is required"],
  unique: true,
},
description:{
  type: String,
  required: [true, "Description is required"],
},
},{ timestamps: true });


module.exports =  mongoose.model('Tutorial', tutorialSchema);
