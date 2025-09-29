"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../model/registration";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { apiHandler } from "@/shared/action/api-handler";
import { responsePostMessage } from "@/shared/model/post-schema";
import { postAction } from "@/shared/action/post-action";
import { toast } from "sonner";
import { Input } from "@/shared/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const RegistrationForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [showPassword, setShowPassword] = useState(false);
  const { push } = useRouter();

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      login: "",
      firstname: "",
      lastname: "",
      patronymic: "",
      bio: "",
      email: "",
      password: "",
      profile_picture_url: "https://i.pinimg.com/originals/6b/5c/54/6b5c51.jpg",
    },
  });

  const registration = useMutation({
    mutationFn: async (data: z.infer<typeof registrationSchema>) =>
      await apiHandler<z.infer<typeof responsePostMessage>>(
        () =>
          postAction<z.infer<typeof registrationSchema>>(
            "/user/registration",
            data
          ),
        responsePostMessage
      ),
    onError: (error: { field: string; message: string }[]) => {
      error.forEach((e) => toast.error(`${e.message}`));
    },
    onSuccess: () => {
      toast.success("Добро пожаловать!");
      push("/login");
    },
  });

  const onSubmit = (data: z.infer<typeof registrationSchema>) => {
    registration.mutate(data);
  };

  return (
    <div
      className={cn("flex flex-col gap-4 w-full max-w-md mx-auto", className)}
      {...props}
    >
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Регистрация</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Логин</FormLabel>
                    <FormControl>
                      <Input placeholder="zombieBrat" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input placeholder="Zomb" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Фамилия</FormLabel>
                    <FormControl>
                      <Input placeholder="Zombiev" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="patronymic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Отчество</FormLabel>
                    <FormControl>
                      <Input placeholder="Zombievich" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="petek@zombie.rzn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Пароль"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>О себе</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Расскажите о себе..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="profile_picture_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="petek@zombie.rzn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant={"link"}
                  className="mt-0 h-fit w-fit"
                  onClick={() => push("/login")}
                >
                  Уже есть аккаунт?
                </Button>
              </div>
              <Button
                type="submit"
                variant="default"
                className="w-full"
                disabled={registration.isPending}
              >
                {registration.isPending
                  ? "Регистрация..."
                  : "Зарегистрироваться"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
