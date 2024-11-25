const mongoose = require('mongoose');

const subTutorialDetailsSchema = new mongoose.Schema({
title:{
  type: String,
  required: true,
  unique: true
},
content:{
  type: String,
  required: true
},
subTutorial_id:{
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: 'SubTutorial'
},
description:{
  type: String,
  required:true
},
Keyword:{
  type: String,
  required: true
}
}, {timestamps: true})


module.exports = mongoose.model("SubTutorialDetails", subTutorialDetailsSchema)