const mongoose = require('mongoose')

const tutorialSchema = new mongoose.Schema({
title:{
  type: String,
  required: true,
  unique: true,
},
description:{
  type: String,
  required: true,
},
},{ timestamps: true });


module.exports =  mongoose.model('Tutorial', tutorialSchema);
