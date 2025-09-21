import { z } from "zod";

export const responsePostMessage = z.object({
  message: z.string(),
});
