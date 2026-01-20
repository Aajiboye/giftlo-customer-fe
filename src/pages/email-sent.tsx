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
import Image from "next/image";



export default function SignIn() {
  const { toast } = useToast();
  const { push } = useRouter();
  const { query, navigateToHome } = useNavigation()


  return (
    <div className="relative  bg-cover bg-center">
      <div className="flex justify-between">
        <img src={images?.logo} alt="" />
      </div>

      <div className="flex flex-col items-center justify-center mt-16 space-y-4">
        <div className="">
          <Image
            src={images.link}
            alt="Link"
            width={204}
            height={204}
          />



        </div>

        <p className="text-secondary font-bold text-xl">Email Verification Link Sent</p>

        <p className="text-center text-light font-light">Verification link has been sent to your mail, check your mail to continue.</p>

        <p className="text-center"><span className="text-accent cursor-pointer" onClick={navigateToHome}>Back to Login</span></p>


      </div>

    </div>
  );
}
