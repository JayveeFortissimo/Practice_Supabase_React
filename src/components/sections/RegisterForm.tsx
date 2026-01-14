import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { registerFormSchema } from "@/lib/formSchemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import supabase from "@/Supabase";
import { toast } from "sonner";
import SpinnerCircle2 from "../common/Loading";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/storeMain";
import { setLoading } from "@/store/authentication";

const RegisterForm = () => {
  const router = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state: RootState) => state.userAuthentication
  );

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, reset } = form;

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    if (values.password !== values.confirmPassword)
      return toast.error("Password and confirm password does not match");
    dispatch(setLoading(true));
    try {
      await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            username: values.username,
          },
        },
      });

      router("/login");
      reset();
    } catch (error) {
      dispatch(setLoading(true));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div className="w-full p-5 flex justify-center items-center">
      <div className="w-[30rem] h-[50rem] flex flex-col justify-center gap-10">
        <div className="text-white grid gap-3">
          <h1 className="text-4xl lg:text-5xl font-bold">Create new Account</h1>
          <p className="text-2xl lg:text-3xl">Welcome Pro Musicians</p>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base lg:text-lg text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John@gmail.com"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base lg:text-lg text-white">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="JohnDoe"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base lg:text-lg text-white">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base lg:text-lg text-white">
                    Confirm
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full">
              <Button
                variant={"default"}
                disabled={isLoading}
                type="submit"
                className="w-full"
              >
                {isLoading ? <SpinnerCircle2 /> : "Sign up"}
              </Button>
            </div>
          </form>
        </Form>

        <div className="w-full border" />
        <p
          onClick={() => router("/login")}
          className="text-center text-white cursor-pointer hover:underline text-sm"
        >
          Have account already?
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
