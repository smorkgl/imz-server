import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 8 символов").isLength({
    min: 8,
  }),
  body("fullName", "Укажите имя (мин. 3 символа)").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка").optional().isURL(),
];
