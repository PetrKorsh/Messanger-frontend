import { apiHandler } from "@/shared/action/api-handler";
import { getAction } from "@/shared/action/get-action";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import z from "zod";

export const chatSchema = z.object({
  id: z.number(),
  is_group: z.boolean(),
  name: z.string(),
});

export const chatsSchema = z.array(chatSchema);

export const getAllChats = (userId: number) =>
  queryOptions({
    queryKey: ["chats", userId], // используем userId для кэша
    queryFn: async () =>
      apiHandler<z.infer<typeof chatsSchema>>(
        () => getAction(`/chat?userId=${userId}`),
        chatsSchema
      ),
    placeholderData: keepPreviousData,
  });
