const Mongoose = require("mongoose");

const TaskSchema = new Mongoose.Schema({

  name: {
    type: "string",
    required: true
  },

  description: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  dueDate: {
    type: Date,
    required: true,
  },

  label: {
    type: String,
    default: 'en progress'
  }

});

const Task = Mongoose.model("task", TaskSchema);

module.exports = Task;
