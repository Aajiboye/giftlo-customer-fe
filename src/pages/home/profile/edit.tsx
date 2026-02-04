'use client';

import { ProfileSideBar } from "@/components";
import useToggle from "@/components/Nav/useToggle";
import ProfileForm from "@/components/profile/ProfileForm";
import { useUser } from "@/context/UserContext";


const Page = () => {
  const [show, toggle] = useToggle();
  const { user } = useUser();

  return <div className="flex flex-col lg:space-y-2">
    <div className="flex min-h-[300px] p-2 md:p-8 gap-8">
      <div className="hidden lg:block w-1/4">
        <ProfileSideBar />

      </div>
      <div className="w-full space-y-4">
        <p className="text-lg text-secondary">Profile Setup</p>

        <ProfileForm profile={user} />
      </div>


    </div>


  </div>
};

export default Page;
