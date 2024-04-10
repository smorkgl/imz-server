import multer from "multer";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
  registerValidation,
  loginValidation,
  postValidation,
} from "./validations.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { UserController, PostController } from "./Controllers/index.js";

mongoose
  .connect("process.env.MONGODB_URI")
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.get(
  "/auth/authme",
  checkAuth,
  handleValidationErrors,
  UserController.authme
);
app.get("/posts/", PostController.getAll);
app.get("/posts/:id", checkAuth, PostController.getOne);
app.post("/posts/", checkAuth, postValidation, PostController.createPost);
app.delete("/posts/:id", checkAuth, PostController.removePost);
app.patch("/posts/:id", checkAuth, postValidation, PostController.updatePost);
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    url: `uploads/${req.file.originalname}`,
  });
});

app.listen(process.env.PORT || 3131, function () {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
