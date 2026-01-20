"use client";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { usePostItem } from "@/utilities/useQuery";
import { toast } from 'sonner';
import { useNavigation } from "@/hooks/useNavigation";
import { LabeledInput as Input } from "@/components/ui/labeledInput";
import images from "@/assets/images";



const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email format"),
  otp: z
    .string()
    .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const otpUrl = `/auth/customer/email/verify`;

export default function SignIn() {
  const { query, navigateToResetPassword, navigateToHome } = useNavigation();
  const email = query?.email;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // Triggers validation when a field loses focus
    defaultValues: {
      email: String(email),
      otp: "",
    },
  });


  const { mutateAsync, isPending } = usePostItem("app", ["verify-otp"], { ...form.getValues() }, otpUrl, false);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const data: any = await mutateAsync();

      toast.success('Email verified Successful');


      navigateToHome();

    } catch (error: any) {

      toast.error(`${error}`);

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
              <h2 className="text-3xl font-bold">Verify Email Address</h2>
              <p className="text-light font-light mt-2">
                We’ve sent a 6-digit verification code to your registered email address. Enter the code below to continue.
              </p>
            </div>


            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 pb-3 space-y-5">

                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          label="OTP Code"
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          placeholder="Enter the 6-digit verification code here"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            field.onChange(value);

                            if (value.length === 6) {
                              form.handleSubmit(onSubmit)();
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="mt-8">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full rounded-xl"
                    isLoading={isPending}
                  >
                    Verify
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
