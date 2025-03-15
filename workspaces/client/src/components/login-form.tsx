import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthSettings } from "@shared/types";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { apiHandler } from "@/lib/handlers/api";
import { useGlobalContext } from "@/context/store";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"form"> {
  authConfig: AuthSettings;
}

const loginSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta giriniz" }),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır" }),
});

export function LoginForm({ authConfig, className, ...props }: LoginFormProps) {
  const { changeUser } = useGlobalContext();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await apiHandler(
        "/api/user-management/login",
        data,
        "GET",
      );
      console.log(response);
      changeUser(response.access_token);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          {authConfig.allowNewAccounts && (
            <p className="text-balance text-sm text-muted-foreground">
              Enter your email below to login to your account
            </p>
          )}
        </div>

        <div className="grid gap-6">
          {authConfig.allowNewAccounts && (
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
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
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <FormControl>
                      <Input id="password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          )}

          {authConfig.allowNewAccounts && (
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          )}

          {authConfig.allowGitHubAuth && (
            <Button variant="outline" type="button" className="w-full">
              Login with GitHub
            </Button>
          )}
          {authConfig.allowGoogleAuth && (
            <Button variant="outline" type="button" className="w-full">
              Login with Google
            </Button>
          )}
          {authConfig.allowAnonymous && (
            <Button variant="outline" type="button" className="w-full">
              Login Anonymously
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
