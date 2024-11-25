const mongoose = require('mongoose');

const subTutorialSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    unique: true
  },
  description: String,
  tutorial_id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Tutorial",
  }
}, {timestamps: true})


module.exports = mongoose.model('SubTutorial', subTutorialSchema);