require("dotenv").config();

const express = require("express");
const router = require("./routes/routes");
const mongoose = require("mongoose");
const createError = require("http-errors");
const cors = require("cors");

const app = express();

require("./config/db.config");

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

/* parse requests to have req.body */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

/* Handle errors */

// Middleware para cuando no encuentra ruta
app.use((req, res, next) => {
  next(createError(304, "Route not found"));
});

// Middleware genérico de errores
app.use((error, req, res, next) => {
  console.error(error);

  if (error instanceof mongoose.Error.ValidationError) {
    error = createError(400, error);
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(400, "Resource not found");
  } else if (error.message.includes("E11000")) {
    error = createError(400, "Resource already exists");
  }
  // else if (error instanceof jwt.JsonWebTokenError) {
  //   error = createError(401, error);
  // }
  else if (!error.status) {
    error = createError(500);
  }

  const data = {};

  data.message = error.message;
  data.errors = error.errors
    ? Object.keys(error.errors).reduce((errors, key) => {
        return {
          ...errors,
          [key]: error.errors[key].message || error.errors[key],
        };
      }, {})
    : undefined;

  res.status(error.status).json(data);
  next();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
