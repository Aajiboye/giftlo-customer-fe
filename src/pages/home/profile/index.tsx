'use client';
import { ProfileSideBar } from "@/components";
import useToggle from "@/components/Nav/useToggle";
import ProfileCard from "@/components/profile/ProfileCard";
import { useUser } from "@/context/UserContext";
import { useNavigation } from "@/hooks/useNavigation";


const Page = () => {
  const [show, toggle] = useToggle();
  const {user} = useUser();
  const {navigateToProfileEdit} = useNavigation();

  return <div className="flex flex-col space-y-2">
    <div className="flex min-h-[300px] p-2 md:p-8 space-x-4">
      <div className="hidden md:block w-1/4">
       <ProfileSideBar />

      </div>

      <div className="w-full space-y-4">
        <p className="text-lg text-secondary">Profile</p>

        <ProfileCard profile={user} onEdit={navigateToProfileEdit}/>
      </div>
      

    </div>

    
  </div>
};

export default Page;
