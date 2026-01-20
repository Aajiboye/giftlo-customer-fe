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
import { LabeledInput as Input } from "@/components/ui/labeledInput";
import images from "@/assets/images";
import { Lock, LockOpen } from "lucide-react"
import SocialLoginButtons from "@/components/common/SocialLoginButtons";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must include at least one uppercase letter")
  .regex(/[a-z]/, "Must include at least one lowercase letter")
  .regex(/\d/, "Must include at least one number")
  .regex(/[@$!%*?&#]/, "Must include at least one special character");

const loginSchema = z
  .object({
    email: z.string().email("Invalid email format"),
    firstName: z.string().min(3, 'FirstName is required'),
    lastName: z.string().min(3, 'lastName is required'),
    phone: z.string().min(8, 'phone is required'),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type LoginFormValues = z.infer<typeof loginSchema>;

const loginUrl = `/auth/customer/sign-up`;

export default function SignIn() {
  const { push } = useRouter();

  const { query, navigateToEmailSent, navigateToHome } = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // Triggers validation when a field loses focus
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
  });


  const { mutateAsync, isPending } = usePostItem("app", ["user-login"], { ...form.getValues() }, loginUrl, false);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const data: any = await mutateAsync();
      toast.success('Signup Successful, verification mail sent to your email');
      navigateToEmailSent();

    } catch (error: any) {
      toast.error(`${error}`);
    }
  };


  return (
    <>
      <div className="relative  bg-cover bg-center">
        <div className="flex justify-between">
          <img src={images?.logo} alt="" />
          <p className="text-light font-light">Already Have an account? <span className="text-secondary font-semibold cursor-pointer" onClick={navigateToHome}>Log In</span></p>
        </div>

        <div className="flex items-center justify-center mt-16">
          <div className="w-full mx-auto">
            <div className="">
              <h2 className="text-3xl font-bold">Create Account</h2>
              <p className="text-light font-light mt-2">
                Users receive personalized gift suggestions
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-5 pb-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input label="First Name" type="text" {...field} placeholder="Enter your First name here" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input label="Last Name" type="text" {...field} placeholder="Enter your Last name here" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input label="Phone Number" type="text" {...field} placeholder="Enter your phone number here" />
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
                      <FormControl>
                        <Input label="Email Address" type="email" {...field} placeholder="Enter your email address here" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            label="Confirm Password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Re-enter the Password to confirm"
                            {...field}
                            rightSlot={
                              <button
                                type="button"
                                className="text-gray-500"
                                onClick={() => setShowConfirmPassword(p => !p)}
                              >
                                {showConfirmPassword ? (
                                  <LockOpen className="w-5 h-5" />
                                ) : (
                                  <Lock className="w-5 h-5" />
                                )}
                              </button>
                            }
                            error={!!fieldState.error}
                          />

                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-8">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full rounded-xl"
                    isLoading={isPending}
                  >
                    Sign Up
                  </Button>
                </div>

                <SocialLoginButtons text="or continue with" type="" />
                <p className="text-center text-light">By registering, you agree to our <span className="text-secondary font-semibold">Terms and Conditions</span> and <span className="text-secondary font-semibold">Privacy Policy</span>. Please ensure you have read and understood them.</p>
              </form>
            </Form>
          </div>
        </div>

      </div>
    </>

  );
}
