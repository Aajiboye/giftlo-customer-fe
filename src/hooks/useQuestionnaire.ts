import { useState } from 'react';
import { questions } from '@/types/questions';

export function useQuestionnaire() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const currentQuestion = questions[currentIndex];

  function next() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
    }
  }

  function previous() {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  }

  function answer(option: string) {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: [option]
    }));
  }

  return {
    currentIndex,
    currentQuestion,
    total: questions.length,
    answers,
    next,
    previous,
    answer
  };
}
