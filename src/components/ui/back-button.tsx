// components/ui/back-button.tsx
import { useRouter } from 'next/router';

type Props = {
    text?:string;
    className?: string;
    iconClassName?:string;
    clickAction?: () => void;
}

const BackButton = ({ text = 'Back', className = '', iconClassName = '', clickAction }: Props) => {
    const router = useRouter();

    const goBack = () => {
        clickAction? clickAction() : router.back();
    };

    return (
        <a
            onClick={goBack}
            className={`inline-flex items-center px-3 py-1.5 rounded-md text-primary cursor-pointer pl-0 ${className}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={`h-6 w-6 ${iconClassName}`}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                ></path>
            </svg>
            <span className="ml-1 font-bold text-lg">{text}</span>
        </a>
    );
};

export default BackButton;
