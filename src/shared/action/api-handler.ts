import { ZodSchema } from "zod";

export async function apiHandler<ReturnType>(
  apiFn: () => Promise<{
    success: boolean;
    data: ReturnType | null;
    errors: { field: string; message: string }[] | null;
  }>,
  schema: ZodSchema<ReturnType>
): Promise<ReturnType> {
  const result = await apiFn();

  if (!result.success) {
    console.error("API Error:", result.errors);
    throw result.errors; // пробрасываем массив ошибок
  }

  // Валидируем через Zod
  return schema.parse(result.data);
}
