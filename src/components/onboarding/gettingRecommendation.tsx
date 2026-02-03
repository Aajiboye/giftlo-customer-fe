// src/components/onboarding/gettingRecommendation.tsx
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import { buildRecommendationPayload } from "@/lib/recommendationPayload";
import { useUser } from "@/context/UserContext";
import { GiftBoldIcon } from "@/assets/svg";

export default function GeneratingRecommendationPage() {
  const router = useRouter();
  const { answers, clearDraft } = useQuestionnaire();
  const { user } = useUser();
  const hasCalledApi = useRef(false);

  useEffect(() => {
    // 1. Guard clause: Ensure we have data to send
    if (Object.keys(answers).length === 0 || hasCalledApi.current) return;

    async function processGifts() {
      hasCalledApi.current = true;
      const userId = user?.id ? String(user.id) : undefined;
      const payload = buildRecommendationPayload(answers, userId);
      
      console.log("Submitting to Engine:", payload);

      try {
        // 2. This is where you trigger the backend logic Abraham described
        // const response = await api.post('/recommendations', payload);
        
        // 3. Match the Figma UX: Show loader for a few seconds
        setTimeout(() => {
          // 4. Cleanup: Clear the draft so the user doesn't see old data on next login
          clearDraft(); 
          
          // 5. Navigate to the Gallery screen (Your Image 2)
          router.push('/recommendations/results'); 
        }, 3000);

      } catch (error) {
        console.error("Failed to generate recommendations:", error);
        hasCalledApi.current = false;
      }
    }

    processGifts();
  }, [answers, user, router, clearDraft]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4">
      <div className="w-full max-w-[852px] flex flex-col items-center text-center mt-10 md:mt-16">
        <h2 className="text-[#3B006B] font-semibold text-[28px] md:text-[36px] leading-tight mb-4">
          Getting the perfect gift recommendation
        </h2>

        <p className="text-[#6B6B6B] text-sm md:text-[16px] leading-relaxed max-w-[701px] mb-14">
          Users receive personalized gift suggestions based on their answers to
          a few simple questions. This makes it easy to recommend the perfect
          best gift options in few seconds.
        </p>

       <div className="mb-12 flex justify-center items-center">
  <div className="w-[120px] h-[120px] md:w-[200px] md:h-[200px] ">
    <GiftBoldIcon 
       width="100%" 
       height="100%" 
       color="#FFB800" 
    />
  </div>
</div>
       <div className="flex flex-col items-center w-full max-w-[420px] mb-4">
  {/* The Track (Background) - 298px wide based on your data */}
  <div 
    style={{ width: '298px', height: '4px', borderRadius: '10px' }} 
    className="bg-[#FAF9FB] overflow-hidden relative"
  >
    {/* The Progress Bar (Thumb) 
        Starts at 32px and animates to 298px
    */}
    <div 
      className="h-full bg-[#3B006B] rounded-[10px] animate-giftlo-progress" 
      style={{ width: '32px' }} 
    />
  </div>

  <p className="text-[#3B006B] text-sm md:text-[15px] font-medium mt-4">
    Please wait this may take a while.......
  </p>
</div>
      </div>
    </div>
  );
}