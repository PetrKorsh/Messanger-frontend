"use server";

import axios from "axios";
import { cookies } from "next/headers";

/**
 * Серверный action для GET запроса
 */
export async function getAction<queryType, ResponseType>(
  url: string,
  query?: queryType
): Promise<{
  success: boolean;
  data: ResponseType | null;
  errors: { field: string; message: string }[] | null;
}> {
  try {
    const CookieStore = await cookies();
    const token = CookieStore.get("token")?.value;

    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`; // токен через Authorization
    }

    const response = await axios.get(`${process.env.API_URL}${url}`, {
      params: query,
      headers,
    });

    return {
      success: true,
      data: response.data as ResponseType,
      errors: null,
    };
  } catch (error: any) {
    console.error("Ошибка сервера:", error.response?.data || error.message);

    const apiErrors = error.response?.data?.errors;

    return {
      success: false,
      data: null,
      errors: apiErrors || [
        {
          field: "server",
          message:
            error.response?.data?.message || "Произошла ошибка на сервере",
        },
      ],
    };
  }
}
