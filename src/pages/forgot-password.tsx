"use client";

import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { usePostItem } from "@/utilities/useQuery";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useNavigation } from "@/hooks/useNavigation";
import { LabeledInput as Input } from "@/components/ui/labeledInput";
import images from "@/assets/images";


const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email format"),

});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function SignIn() {
  const { toast } = useToast();
  const { query, navigateToHome, navigateToEmailSent } = useNavigation()


  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",

    },
  });



  const { mutateAsync, status } = usePostItem("app", ["/auth/customer/forgot-password"], form.getValues(), "/auth/customer/forgot-password", false);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const data: any = await mutateAsync();

      //console.log({ data });

      toast({
        variant: "success",
        title: "Reset mail sent to your email",
        description: "Check your email",
      })

      navigateToEmailSent();

    } catch (error: any) {
      toast({
        variant: "error",
        title: `${error}`,
        description: "There was a problem with your reset password request.",
        action: <ToastAction altText="Try again" onClick={() => onSubmit(values)}>Retry</ToastAction>,
      });
    }
  };

  return (
    <div className="relative  bg-cover bg-center">
      <div className="flex justify-between">
        <img src={images?.logo} alt="" />
      </div>

      <div className="flex items-center justify-center mt-16">
        <div className="w-full mx-auto">
          <div className="">
            <h2 className="text-3xl font-bold">Verify Email Address</h2>
            <p className="text-light font-light mt-2">By entering your email address to reset your password, you'll receive a link in your inbox that will allow you reset your password.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-16 pb-3 space-y-10">

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
              




              {/* Submit Button */}
              <div className="mt-16">
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

              <p className="text-center"><span className="text-secondary cursor-pointer" onClick={navigateToHome}>Back to Login</span></p>

            </form>
          </Form>


        </div>
      </div>

    </div>
  );
}
