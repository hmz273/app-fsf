const Task = require("../Models/taskModal");
const moment = require('moment');


exports.createTask = async (req, res, next) => {
    try {
        const { name, type, description, dueDate } = req.body;
        const formatDate = (date, format = 'YYYY-MM-DD') =>
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

// exports.removeCarById = async (req, res) => {
//     const { id } = req.params;
//     try {
//       const car = await Car.findByIdAndDelete(id);
//       if (!car) {
//         return res.status(404).json({
//           error: true,
//           message: 'Car not found',
//           data: null,
//         });
//       }
//       res.status(200).json({
//         error: false,
//         message: 'Car deleted successfully',
//         car,
//       });
//     } catch (error) {
//       res.status(500).json({
//         error: false,
//         message: error.message,
//         data: null,
//       });
//     }
// };

// exports.getCarById = async (req, res) => {
//     const { id } = req.params;
//     try {
//       const car = await Car.findById(id);
//       if (!car) {
//         return res.status(404).json({
//           error: true,
//           message: `Cannot find Car with this id ${id}`,
//           data: null,
//         });
//       }
//       res.status(200).json({
//         error: false,
//         message: null,
//         data: car,
//       });
//     } catch (error) {
//       res.status(500).json({
//         error: true,
//         message: error.message,
//         data: null,
//       });
//     }
// };

// exports.getAllCars = async (req, res) => {
//     try {
//       const cars = await Car.find()
//       if (!cars) {
//         return res.status(404).json({
//           error: true,
//           message: 'Cars not found',
//           data: null,
//         });
//       }
//       res.status(200).json({
//         error: false,
//         message: 'Cars retrieved successfully',
//         data: cars,
//       });
//     } catch (error) {
//       res.status(500).json({
//         error: true,
//         message: error.message,
//         data: null,
//       });
//     }
// };