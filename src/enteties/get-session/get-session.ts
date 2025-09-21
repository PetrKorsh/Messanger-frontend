"use server";
import { AuthInterface } from "@/shared/providers/auth-provider";
import axios from "axios";
import { cookies } from "next/headers";

export const getSession: () => Promise<AuthInterface> = async () => {
  const cookieStore = await cookies();
  try {
    const response = await axios.get(`${process.env.API_URL}/user`, {
      headers: {
        Cookie: `token=${cookieStore.get("token")?.value}`,
      },
    });

    return {
      auth: true,
      user: response.data,
    };
  } catch {
    return {
      auth: false,
      user: null,
    };
  }
};
