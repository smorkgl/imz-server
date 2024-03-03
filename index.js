import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { registerValidation } from "./validations/auth.js";
import { validationResult } from "express-validator";
import UserModel from "./models/Users.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./Controllers/UserController.js";

mongoose
  .connect(
    "mongodb+srv://catosrak:210976nL@test.qt168zu.mongodb.net/?retryWrites=true&w=majority&appName=test"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.post("/auth/register", registerValidation, UserController.register);
app.post("/auth/login", UserController.login);
app.post("/auth/authme", checkAuth, UserController.authme);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3131, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
