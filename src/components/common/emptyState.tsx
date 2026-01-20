import images from '@/assets/images';
import { Button } from '@ui/button';
import { ArrowRight } from 'lucide-react';
import Loader from './loader';

type EmptyProps = {
  header?: string;
  title: string;
  description: string;
  hasButton?: boolean;
  buttonText?: string;
  btnStyle?: string;
  action?(): void;
  isLoading?: boolean;
};

export default function Empty(props: EmptyProps) {
  const {
    header,
    title,
    description,
    hasButton,
    buttonText,
    action,
    btnStyle,
    isLoading
  } = props;

  return (
    <>
      {isLoading ? (
        <div
          className={`bg-inherit w-full p-4 md:p-6 rounded-xl text-black my-4`}
        >
          <Loader />
        </div>
      ) : (
        <div
          className={`bg-inherit w-full p-4 md:p-6 ${
            header && 'md:py-16'
          } rounded-xl text-black my-4`}
        >
          {header && <p className="my-2 font-bold text-xl">{header}</p>}

          <div className="flex flex-col items-center justify-center">
            <img src={images.welcome} className="" alt="" />
            <p className="text-lg">{title}</p>
            <p className="text-wrap text-secondary text-sm text-center mt-2">
              {description}
            </p>

            {hasButton && (
              <Button
                onClick={action}
                className={`bg-transparent hover:bg-transparent flex text-gray-600 w-30 rounded-xl items-center border border-gray-300 h-full ${btnStyle}`}
              >
                <span className="flex gap-2 m-auto">
                  <p className="font-semibold text-sm m-auto">{buttonText}</p>
                </span>
                <ArrowRight size={20} className="m-auto" />
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
