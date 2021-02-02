// local imports
const express = require("express");
const app = express();
const helmet = require("helmet");
const compression = require("compression");

// node imports
const connectDB = require("./config/db");

// constants
const PORT = process.env.PORT || 3000;

// parsing data
app.use(express.json({ extended: false }));

app.use(helmet()); //set standard http headers for security
app.use(compression()); // compress data

// add header to all responses - allow CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// route not found
app.use("/", (req, res, next) => {
  res.status(404).json({ message: "route not found" });
});

// handling errors
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;

  res.status(status).json({ message });
});

//Connect DB
connectDB();

// start server
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
