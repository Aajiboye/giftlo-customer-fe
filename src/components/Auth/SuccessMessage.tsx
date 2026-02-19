"use client";
import { CheckCircle, CircleAlertIcon } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  onClose?: () => void;
  title: string;
  description: string | React.ReactNode;
  isSuccess?: boolean;
  onButtonClick?: () => void;
  btnText?: string;
  isLoading?: boolean;
  cancelBtn?: boolean;
}

export default function SuccessMessage({ onClose, title, description, isSuccess = true, btnText, onButtonClick, isLoading, cancelBtn }: Props) {
  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
      {/* Success Icon */}
      <div className="flex justify-center mb-4">
        {isSuccess ? <div className="bg-green-100 p-3 rounded-full">
          <CheckCircle className="text-success w-8 h-8" />
        </div>
          :
          <div className="bg-white p-3 rounded-full">
            <CircleAlertIcon className="text-danger w-8 h-8" />
          </div>
        }
      </div>

      {/* Message */}
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="text-gray-600 text-sm mt-2">
        {description}
      </div>


      {/* Okay Button */}
      <div className={cancelBtn ? `flex justify-between gap-2 mt-2`: 'text-center mt-2'}>
        {cancelBtn && <Button className="w-full mt-6 py-2 rounded-lg font-semibold" variant={'outline'} onClick={() => onClose?.()}>
          Cancel
        </Button>}

        <Button variant={'secondary'} onClick={() => onButtonClick ? onButtonClick() : onClose?.()} isLoading={isLoading}>
          {btnText || "Okay"}
        </Button>
      </div>

    </div>
  );
}
