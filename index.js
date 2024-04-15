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
import EasyYandexS3 from "easy-yandex-s3";

let s3 = new EasyYandexS3({
  auth: {
    accessKeyId: "YCAJEq5MaM4QsxR9UkcbD5yiz",
    secretAccessKey: "YCPF5fnM78gR-uyrNXBXHHD5l4HTlSe58H3dEPon",
  },
  Bucket: "imz", // Название бакета
  debug: false, // Дебаг в консоли
});

mongoose
  .connect(
    "mongodb+srv://catosrak:210976nL@test.qt168zu.mongodb.net/?retryWrites=true&w=majority&appName=test"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());
app.use(cors());
app.use(multer().any());

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
app.post("/upload", async (req, res) => {
  try {
    let buffer = req.files[0].buffer; // Буфер загруженного файла
    let upload = await s3.Upload({ buffer }, "/files/"); // Загрузка в бакет
    res.json({ url: upload.Location }); // Ответ сервера - URL загруженного файла
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ошибка при загрузке файла" });
  }
});

app.listen(3131, function () {
  console.log("Server OK");
});
