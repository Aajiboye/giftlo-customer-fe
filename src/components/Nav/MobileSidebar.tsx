import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import SideBar from './SideBar';
import ProfileSideBar from './ProfileSidebar';


export default function MobileSideBar({ show, toggle }: any) {
    const { push, pathname, back } = useRouter();
    console.log({ pathname })

    return (
        <div
            onClick={show ? toggle : undefined}
            className={cn(
                {
                    'left-0 after:w-screen after:absolute after:-z-10 after:left-0 after:right-0 after:bottom-0 after:top-0 after:bg-gray-900 after:opacity-50 border border-sidebar':
                        show,
                    '-left-96': !show,
                },
                'fixed shadow bg-sidebar_bg w-[15rem] top-0 bottom-0 z-50 flex flex-col justify-between transition-all ease-in-out duration-350 lg:hidden'
            )}

        >
            <div className="h-full bg-sidebar_bg text-sidebar_text flex flex-col py-4">
                {/* <div className="flex items-center gap-2" onClick={show ? toggle : undefined}>
                    <X className="h-6 w-6 text-[#3B006B] md:hidden cursor-pointer" />
                </div> */}

                {pathname == '/home/profile' ? <ProfileSideBar /> : <SideBar />}

                {/* Mobile Sidebar */}

            </div>
        </div >
    );
}
