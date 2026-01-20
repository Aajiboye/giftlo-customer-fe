import Image from "next/image";
import icons from "@/assets/icons";

type Props = {
  text?: string;
  type?: string
}

export default function SocialLoginButtons({text, type = 'Login with'}: Props) {
  return (
    <div className="w-full mx-auto">
      {/* OR Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-sm text-gray-400">{text ?? "or"}</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        {/* Google */}
        <button
          type="button"
          className="flex items-center justify-center gap-3 w-full rounded-lg border border-gray-300 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          <Image
            src={icons.google}
            alt="Google"
            width={24}
            height={24}
          />
          {type} Google
        </button>

        {/* Apple */}
        <button
          type="button"
          className="flex items-center justify-center gap-3 w-full rounded-lg border border-gray-300 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          <Image
            src={icons.apple}
            alt="Apple"
            width={24}
            height={24}
          />
          {type} Apple
        </button>
      </div>
    </div>
  );
}
