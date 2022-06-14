const Mongoose = require("mongoose");

const localDB = "mongodb+srv://hmz:48erCduHbW3u6CR@cluster0.jxxa0.mongodb.net/app-fsf?retryWrites=true&w=majority";

const connectDB = async () => {
  await Mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("MongoDB Connected");
};

module.exports = connectDB;
