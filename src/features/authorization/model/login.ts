import z from "zod";

export const loginSchema = z.object({
  loginEmail: z.string().nonempty("Поле не может быть пустым"),
  password: z.string().nonempty("Поле не может быть пустым"),
});

export const loginResponse = z.object({
  user: z.object({
    firstname: z.string(),
    lastname: z.string(),
  }),
});
