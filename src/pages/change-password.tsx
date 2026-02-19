"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { usePostItem, usePostWithData } from "@/utilities/useQuery";
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useNavigation } from "@/hooks/useNavigation";
import { LabeledInput as Input } from "@/components/ui/labeledInput";
import images from "@/assets/images";
import { Lock, LockOpen } from "lucide-react"

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must include at least one uppercase letter")
  .regex(/[a-z]/, "Must include at least one lowercase letter")
  .regex(/\d/, "Must include at least one number")
  .regex(/[@$!%*?&#]/, "Must include at least one special character");

const loginSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type LoginFormValues = z.infer<typeof loginSchema>;

export default function SignIn() {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';

  const { query, navigateToResetPassword, navigateToSignin } = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // Triggers validation when a field loses focus
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });


  const { mutateAsync, status } = usePostWithData("app", ["/auth/customer/reset-password"], "/auth/customer/reset-password", false);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      if (!email && !token) {
        return toast.error(
          `You should not be here and you know it`
        );
      };

      const payload = {
        email, tokenId: token, newPassword: form.getValues('password')
      }

      const data: any = await mutateAsync(payload);

      toast.success('Password Reset Successful - Go ahead to login');

      navigateToSignin();

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
        </div>

        <div className="flex items-center justify-center mt-16">
          <div className="w-full mx-auto">
            <div className="">
              <h2 className="text-3xl font-bold">Create a New Password</h2>
              {/* <p className="text-light font-light mt-2">
                Create your new password.
              </p> */}
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-10 pb-3">
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
                            placeholder="Enter New Password"
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
                            placeholder="Confirm New Password"
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
                    isLoading={status === 'pending'}
                  >
                    Reset Password
                  </Button>
                </div>

              </form>
            </Form>
          </div>
        </div>

      </div>
    </>

  );
}
