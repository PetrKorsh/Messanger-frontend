import { z } from "zod";

export const registrationSchema = z.object({
  login: z
    .string()
    .max(50, "Длина логина должна быть менее 50 символов")
    .nonempty("Это поле обязательно"),
  firstname: z
    .string()
    .max(50, "Длина логина должна быть менее 50 символов")
    .nonempty("Это поле обязательно"),
  lastname: z
    .string()
    .max(50, "Длина логина должна быть менее 50 символов")
    .nonempty("Это поле обязательно"),
  patronymic: z
    .string()
    .max(50, "Длина должна быть менее 50 символов")
    .optional(),
  bio: z.string().max(256, "Длина не может быть более 256 символов").optional(),
  email: z.email().nonempty("Это поле обязательно"),
  password_hash: z
    .string()
    .max(50, "Длина логина должна быть менее 50 символов")
    .nonempty("Это поле обязательно"),
  profile_picture_url: z.string().optional(),
});
