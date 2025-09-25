"use server";
import axios from "axios";
import { cookies } from "next/headers";

/**
 * Функция для парса куков из header Set-Cookie
 */
function parseSetCookie(setCookieStr: string) {
  const parts = setCookieStr.split(";").map((part) => part.trim());
  const [key, value] = parts[0].split("=");

  const cookieObj: Record<string, any> = { key, value };

  parts.slice(1).forEach((part) => {
    const [key, value] = part.split("=");
    cookieObj[key.toLowerCase()] = value || true;
  });

  return cookieObj;
}

/**
 * Сервернный action для post запросa
 */
export async function postAction<DataType>(url: string, data?: DataType) {
  try {
    const CookieStore = await cookies();
    const token = CookieStore.get("token")?.value;

    const headers: Record<string, string> = {};
    if (token) {
      headers.Cookie = `token=${token}`;
    }

    const response = await axios.post(`${process.env.API_URL}${url}`, data, {
      withCredentials: true,
      headers,
    });

    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      setCookieHeader.forEach((cookieStr: string) => {
        const parsedCookie = parseSetCookie(cookieStr);
        CookieStore.set(parsedCookie.key, parsedCookie.value, {
          path: parsedCookie.path || "/",
          expires: parsedCookie.expires
            ? new Date(parsedCookie.expires)
            : undefined,
          httpOnly: !!parsedCookie.httponly,
          secure: !!parsedCookie.secure,
          sameSite: parsedCookie.samesite || "Lax",
        });
      });
    }

    // Возвращаем структуру для успешного запроса
    return {
      success: true,
      data: response.data,
      errors: null,
    };
  } catch (error: any) {
    console.error(
      "Ошибка сервера:",
      error.response?.data,
      "URL",
      error.response?.config?.url
    );

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
