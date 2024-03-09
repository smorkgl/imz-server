import express from "express";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
  postValidation,
} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./Controllers/UserController.js";
import * as PostController from "./Controllers/PostController.js";

mongoose
  .connect(
    "mongodb+srv://catosrak:210976nL@test.qt168zu.mongodb.net/?retryWrites=true&w=majority&appName=test"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, UserController.register);
app.post("/auth/login", loginValidation, UserController.login);
app.get("/auth/authme", checkAuth, UserController.authme);
app.get("/posts/", PostController.getAll);
app.get("/posts/:id", checkAuth, PostController.getOne);
app.post("/posts/", checkAuth, postValidation, PostController.createPost);
app.delete("/posts/:id", checkAuth, PostController.remove);
// app.patch("/posts/", checkAuth, PostController.update);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3131, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
