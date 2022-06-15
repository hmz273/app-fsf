const Task = require("../Models/taskModal");
const moment = require('moment');


exports.createTask = async (req, res, next) => {
    try {
        const { name, type, description, dueDate } = req.body;
        const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss Z+HHmm') =>
              moment(date).format(format);
        const Date = formatDate(dueDate);
        const { id } = req.params;
        const task = await Task.findOne({
          _id: id,
        })

        // Car already exists
        if (task) {
            res.status(409); // conflict error
            const error = new Error('task already exists');
            return next(error);
        }  
           
        const newtask = await Task.create({
          name,
          description,
          dueDate: Date,
          type,
      }); 
        res.status(201).json(newtask);
    } catch(error) {
        next(error);
    }
}

exports.updateTask = async (req, res, next) => {
  try {
    
    const { id } = req.params; 
    const { name, type, description, dueDate } = req.body;
    const formatDate = (date, format = 'YYYY-MM-DD') =>
              moment(date).format(format);
    const Date = formatDate(dueDate);
    
    const task = await Task.findByIdAndUpdate(
      {
        _id: id,
      },
      { 
        name,
        description,
        dueDate: Date,
        type,
       },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({
        error: true,
        message: 'error to update the task',
      });
    }
    res.status(200).json({
      error: false,
      message: 'task has been updated successfully',
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
      data: null,
    });
  }
}

exports.removeTaskById = async (req, res) => {
    const { id } = req.params;
    try {
      const task = await Task.findByIdAndDelete(id);
      if (!task) {
        return res.status(404).json({
          error: true,
          message: 'task not found',
          data: null,
        });
      }
      res.status(200).json({
        error: false,
        message: 'task deleted successfully',
        task,
      });
    } catch (error) {
      res.status(500).json({
        error: false,
        message: error.message,
        data: null,
      });
    }
};

exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({
          error: true,
          message: `Cannot find task with this id ${id}`,
          data: null,
        });
      }
      res.status(200).json({
        error: false,
        message: null,
        data: task,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error.message,
        data: null,
      });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find()
      if (!tasks) {
        return res.status(404).json({
          error: true,
          message: 'tasks not found',
          data: null,
        });
      }
      res.status(200).json({
        error: false,
        message: 'tasks retrieved successfully',
        data: tasks,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error.message,
        data: null,
      });
    }
};

exports.encourTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(id, {
      status: 'encour',
    });

    return res.status(200).json({
      error: false,
      message: 'Task encour......',
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
      data: null,
    });
  }
};

exports.doneTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(id, {
      status: 'done',
    });

    return res.status(200).json({
      error: false,
      message: 'Task Done',
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
      data: null,
    });
  }
};