"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/shared/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";
import { EyeOff, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import z from "zod";
import { loginResponse, loginSchema } from "../model/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiHandler } from "@/shared/action/api-handler";
import { postAction } from "@/shared/action/post-action";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

export const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [showPassword, setShowPassword] = useState(false);
  const { push } = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      loginEmail: "",
      password: "",
    },
  });

  const login = useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) =>
      await apiHandler<z.infer<typeof loginResponse>>(
        () => postAction<z.infer<typeof loginSchema>>("/user", data),
        loginResponse
      ),
    onError: (error: { field: string; message: string }[]) => {
      error.forEach((e) => toast.error(`${e.message}`));
    },
    onSuccess: (data) => {
      toast.success(
        `Добро пожаловать ${data.user.firstname} ${data.user.lastname}!`
      );
      push("/profile");
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login.mutate(data);
  };

  return (
    <div
      className={cn("flex flex-col gap-4 w-full max-w-md mx-auto", className)}
      {...props}
    >
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">Авторизация</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="loginEmail"
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
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant={"link"}
                  className="mt-0 h-fit w-fit"
                  onClick={() => push("/registration")}
                >
                  Все еще нет аккаунта?
                </Button>
              </div>
              <Button
                type="submit"
                className="w-full mt-0 border-white border-[0.1px] hover:scale-[1.05] bg-transparent text-white hover:bg-transparent shadow-sm hover:shadow shadow-[#ffffff7c] "
                disabled={login.isPending}
              >
                {login.isPending ? "Войти..." : "Войти"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
