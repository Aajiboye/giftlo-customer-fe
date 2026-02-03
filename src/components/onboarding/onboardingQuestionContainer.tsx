

import { Button } from '@/components/ui/button'; 
import { QuestionCard } from './QuestionCard';
import { QuestionOptions } from './QuestionOptions';
import { useQuestionnaire } from '@/hooks/useQuestionnaire';
import { WelcomeHeader } from './WelcomeHeader';
import { useUser } from '@/context/UserContext';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

export function OnboardingQuestionContainer() {
  const q = useQuestionnaire();
  const { user } = useUser();

  const displayName = user?.fullName ?? 'N/A';

  return (
    <section className="bg-white min-h-screen">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 pt-8 md:pt-14 pb-32 md:pb-20 text-white space-y-8 md:space-y-12">

        <WelcomeHeader />

        {/* Progress Section */}
        <div className="flex items-center justify-between gap-3 md:gap-5">
          <div className="flex flex-1 gap-1 md:gap-2">
            {Array.from({ length: q.total }).map((_, i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  i <= q.currentIndex
                    ? 'bg-[#FFC400]'
                    : 'bg-gray-200 md:bg-white/40' // Darker gray on mobile white bg for visibility
                }`}
              />
            ))}
          </div>

          <span className="text-xs md:text-sm text-[#380066] font-medium whitespace-nowrap">
            {q.currentIndex + 1} of {q.total} Questions
          </span>
        </div>

        <QuestionCard title={q.currentQuestion.title}>
          <QuestionOptions
            options={q.currentQuestion.options}
            onSelect={q.answer}
            selected={q.answers[q.currentQuestion.id]}
            layout={q.currentQuestion.layout}
          />
        </QuestionCard>

        {/* FOOTER NAVIGATION:
            - Mobile: Sticky/Fixed to the bottom for easy thumb access.
            - PC: Static/Normal flow at the bottom of the container.
        */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center justify-between w-full md:static md:bg-transparent md:border-none md:p-0 md:mt-12 md:px-4">
          <div className="flex items-center justify-between w-full max-w-[1200px] mx-auto gap-4">
            <Button
              variant="outline"
              onClick={q.previous}
              disabled={q.currentIndex === 0}
              className={`
                flex-1 md:flex-none flex items-center justify-center gap-2 py-6 md:py-4 px-6 md:px-10 rounded-lg text-white font-medium transition-all
                bg-[#3B0066] hover:bg-[#2D004D] disabled:opacity-50 disabled:cursor-not-allowed
                border-none shadow-sm
              `}
            >
              <ChevronsLeft className="w-5 h-5" />
              Previous
            </Button>

            <Button
              onClick={q.next}
              className={`
                flex-1 md:flex-none flex items-center justify-center gap-2 py-6 md:py-4 px-6 md:px-10 rounded-lg text-white font-medium transition-all
                bg-[#3B0066] hover:bg-[#2D004D] border-none shadow-sm
              `}
            >
              Next
              <ChevronsRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}