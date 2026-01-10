import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { loginFormSchema } from "@/lib/formSchemas";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

import supabase from "@/Supabase";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useNavigate();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, reset } = form;

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {

      const {error} = await supabase.auth.signInWithPassword({email:values.email,password:values.password});
     
    if (error) {
      console.log(error);
      toast.error("Cannot Login! ");
      return;
    }

    router("/");
    reset();
  }

  return (
    <div className="w-full p-5 flex justify-center items-center">
      <div className="w-[30rem] h-[50rem] flex flex-col justify-center gap-10">
        <div className="text-white grid gap-3">
          <h1 className="text-4xl lg:text-5xl font-bold">Let’s you sign in</h1>
          <p className="text-2xl lg:text-3xl">Welcome Pro Musicians</p>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base lg:text-lg text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      //   disabled={isLoading}
                      placeholder="JohnDoe@gmail.com"
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base lg:text-lg text-white">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      //   disabled={isLoading}
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
              name="rememberMe"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-5">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="cursor-pointer"
                      />
                      <FormLabel className="text-base text-white">
                        Remember me
                      </FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full">
              <Button variant={"default"} type="submit" className="w-full">
                {/* {isLoading ? <SpinnerCircle /> : "Sign in"} */} Sign in
              </Button>
            </div>
          </form>
        </Form>

        <div className="w-full border" />
        <p onClick={() => router('/register')} className="text-center text-white cursor-pointer hover:underline text-sm">
          Don't have account yet?
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
