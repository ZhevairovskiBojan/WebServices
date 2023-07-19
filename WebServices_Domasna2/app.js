const express = require("express");
const db = require("./pkb/db/index");
const jwt = require("express-jwt");

const authHandler = require("./handlers/authHandler");
const { functionBZ } = require("./handlers/functionBZ");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.init();

app.use(
  jwt.expressjwt({
    algorithms: ["HS256"],
    secret: process.env.JWT_SECRET,
  }).unless({
    path: ["/api/v1/signup", "/api/v1/login"],
  })
);

app.get("/bojanzhev", functionBZ);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Failed to start service.");
  }
  console.log(`Service started successfully on port ${process.env.PORT}`);
});
