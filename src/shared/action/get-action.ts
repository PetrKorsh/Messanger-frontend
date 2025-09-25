"use server";

import axios from "axios";
import { cookies } from "next/headers";

/**
 * Сервернный action для get запросa
 */
export async function getAction<queryType>(url: string, query?: queryType) {
  try {
    const CookieStore = await cookies();
    const token = CookieStore.get("token")?.value;

    const headers: Record<string, string> = {};
    if (token) {
      headers.Cookie = `token=${token}`;
    }

    const response = await axios.get(`${process.env.API_URL}${url}`, {
      params: query,
      headers,
    });

    return { data: response.data, error: null };
  } catch (error: any) {
    console.error(
      "Ошибка сервера:",
      error.response?.data?.message || error.message,
    );

    return {
      data: null,
      error: error.response?.data?.message || "Произошла ошибка на сервере",
    };
  }
}
