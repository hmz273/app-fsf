const express = require("express");
const connectDB = require("./db");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = 8000;


connectDB();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./Auth/authRoute"));




const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
