import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { questions, Question } from '@/types/questions';

const STORAGE_KEY = 'giftlo_questionnaire_draft';

export interface QuestionnaireHook {
  currentIndex: number;
  total: number;
  currentQuestion: Question;
  answers: Record<string, string[]>;
  next: () => void;
  previous: () => void;
  answer: (option: string) => void;
  clearDraft: () => void; // Fixed: Now exists in interface
}

export function useQuestionnaire(): QuestionnaireHook {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setAnswers(parsed.answers || {});
      setCurrentIndex(parsed.index || 0);
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, index: currentIndex }));
    }
  }, [answers, currentIndex, isLoaded]);

  const currentQuestion = questions[currentIndex];

  function next() {
    if (currentIndex === questions.length - 1) {
      router.push('/questionnaire/generating');
      return;
    }
    setCurrentIndex(i => i + 1);
  }

  function previous() {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  }

 // Add this logic to your answer function in useQuestionnaire.ts
function answer(option: string, customText?: string) {
  setAnswers(prev => {
    const qid = currentQuestion.id;
    const prevAnswers = prev[qid] ?? [];

    // If the user typed something in the "Other" field
    const valueToStore = customText ? `Other: ${customText}` : option;

    if (currentQuestion.multiple) {
      // Logic to toggle the selection
      const exists = prevAnswers.includes(valueToStore);
      return {
        ...prev,
        [qid]: exists 
          ? prevAnswers.filter(o => o !== valueToStore) 
          : [...prevAnswers, valueToStore]
      };
    }

    return { ...prev, [qid]: [valueToStore] };
  });
}

  function clearDraft() {
    localStorage.removeItem(STORAGE_KEY);
    setAnswers({});
    setCurrentIndex(0);
  }

  return {
    currentIndex,
    total: questions.length,
    currentQuestion,
    answers,
    next,
    previous,
    answer,
    clearDraft,
  };
}