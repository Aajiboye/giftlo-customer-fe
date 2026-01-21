"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { usePostItem } from "@/utilities/useQuery";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { useNavigation } from "@/hooks/useNavigation";
import { getLocalStorage } from "@/utilities/localStorage";
import Cookies from 'js-cookie';
import { LabeledInput as Input } from "@/components/ui/labeledInput";
import images from "@/assets/images";
import { Lock, LockOpen } from "lucide-react"
import SocialLoginButtons from "@/components/common/SocialLoginButtons";



const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z
    .string()

});

type LoginFormValues = z.infer<typeof loginSchema>;

const loginUrl = `/auth/customer/login`;

export default function SignIn() {
  const { push } = useRouter();

  const { query, navigateToResetPassword, navigateToSignup } = useNavigation();
  const [showPassword, setShowPassword] = useState(false);


  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // Triggers validation when a field loses focus
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const { mutateAsync, isPending } = usePostItem("app", ["user-login"], { email: form.getValues().email.toLocaleLowerCase(), password: form.getValues().password }, loginUrl, false);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const data: any = await mutateAsync();

      console.log({data})

      const localStorage = getLocalStorage();
      if (localStorage) {
        localStorage.setItem("giftlo_user", JSON.stringify(data));
        Cookies.set("giftlo_token", data?.token);
        Cookies.set("giftlo_refreshToken", data?.refreshToken);
      } else {
        //console.error("Local storage error occurred", "error");
      }
      toast.success('Login Successful - Welcome to Giftlo');


      push("/app/home");

    } catch (error: any) {

      toast.error(
        `${error}`
      );
    }
  };


  return (
    <>
      <div className="relative  bg-cover bg-center">
        <div className="flex justify-between">
          <img src={images?.logo} alt="" />
          <p className="text-light font-light">Don’t have an account? <span className="text-secondary font-semibold cursor-pointer" onClick={navigateToSignup}>Sign Up</span></p>
        </div>

        <div className="flex items-center justify-center mt-16">
          <div className="w-full mx-auto">
            <div className="">
              <h2 className="text-3xl font-bold">Welcome Back!</h2>
              <p className="text-light font-light mt-2">
                Users receive personalized gift suggestions
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 pb-3 space-y-5">

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input label="Email Address" type="email" {...field} placeholder="Enter your email address here" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col space-y-2">

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              label="Password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a strong pasword"
                              {...field}
                              error={!!fieldState.error}
                              rightSlot={
                                <button
                                  type="button"
                                  className="text-gray-500"
                                  onClick={() => setShowPassword(p => !p)}
                                >
                                  {showPassword ? (
                                    <LockOpen className="w-5 h-5" />
                                  ) : (
                                    <Lock className="w-5 h-5" />
                                  )}
                                </button>
                              }
                            />

                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="text-right mt-1">
                    <p className="text-sm text-gray-500">
                      <span className="text-light font-light cursor-pointer" onClick={navigateToResetPassword}>Forgot Password?</span>
                    </p>
                  </div>
                </div>




                {/* Submit Button */}
                <div className="mt-8">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full rounded-xl"
                    isLoading={isPending}
                  >
                    Log In
                  </Button>
                </div>

                <SocialLoginButtons />

              </form>
            </Form>


          </div>
        </div>

      </div>
    </>

  );
}
