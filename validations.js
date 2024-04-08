import { body } from "express-validator";

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 8 символов").isLength({
    min: 8,
  }),
];

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 8 символов").isLength({
    min: 8,
  }),
  body("fullName", "Укажите имя (мин. 3 символа)").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка").optional().isURL(),
];

export const postValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
  body("mini_title", "Введите заголовок мини_статьи")
    .isLength({ min: 3, max: 125 })
    .isString(),
  body("description", "Введите описание статьи").isLength({
    min: 10,
  }),
  body("date", "Неверная дата публикации").isLength({ min: 3 }),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
];
