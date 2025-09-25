import { error } from "console";
import { z } from "zod";

export const responsePostMessage = z.array(
  z.object({
    message: z.string(),
  })
);
