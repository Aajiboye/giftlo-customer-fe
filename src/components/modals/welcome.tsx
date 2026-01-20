import images from '@/assets/images';
import { useNavigation } from '@/hooks/useNavigation';
import { Button } from '@ui/button';
import { ArrowRight, Gift } from 'lucide-react';



export default function Welcome() {
    const { query, navigateToResetPassword, navigateToHome } = useNavigation();
    

    return (
        <>

            <div
                className={`bg-inherit w-full p-4 md:p-6`}
            >
                <div className="flex flex-col items-center justify-center">
                    <img src={images.welcome} className="" alt="" />
                    <p className="text-lg">Welcome to Giftlo</p>
                    <p className="text-wrap text-secondary text-sm text-center mt-2">
                        Gifts becomes even more special when they're surprises. We are here to assist you in your journey to finding the perfect gift for you and your loved ones just with one click.
                    </p>
                        <Button
                            onClick={navigateToHome}
                            className={`bg-transparent hover:bg-transparent flex text-gray-600 w-30 rounded-xl items-center border border-gray-300 h-full`}
                        >
                            <Gift size={20} className="m-auto" />
                            <span className="flex gap-2 m-auto">
                                <p className="font-semibold text-sm m-auto">Generate Gift Ideas</p>
                            </span>
                        </Button>
                </div>
            </div>

        </>
    );
}
