// src/lib/recommendationPayload.ts

/**
 * Versioning ensures the backend knows how to parse data even if 
 * questions change in the future.
 */
export const PAYLOAD_VERSION = "1.0.0";

export interface RecommendationPayload {
  version: string;
  metadata: {
    userId: string;
    sessionId: string;
    timestamp: string;
  };
  context: {
    occasion: string[];
    relationship: string[];
  };
  recipient_profile: {
    interests: string[];
    gender: string[];
    age_range: string[];
    personality: string[];
    aesthetic: string[];
  };
  preferences: {
    budget_range: string[];
    gift_type: string[];
    specific_wants: string[];
  };
}

/**
 * Transforms the flat 'answers' Record into a structured payload.
 */
export function buildRecommendationPayload(
  answers: Record<string, string[]>,
  userId?: string | number,
  sessionId: string = crypto.randomUUID()
): RecommendationPayload {
  
  const demographics = answers['demographics'] || [];
  
  return {
    version: PAYLOAD_VERSION,
    metadata: {
      userId: userId ? String(userId) : 'guest',
      sessionId,
      timestamp: new Date().toISOString(),
    },
    context: {
      occasion: answers['occasion'] || [],
      relationship: answers['recipient-relationship'] || [],
    },
    recipient_profile: {
      interests: answers['interests'] || [],
      // Separating gender and age for more precise backend filtering
      gender: demographics.filter(val => ['male', 'female'].includes(val)),
      age_range: demographics.filter(val => !['male', 'female'].includes(val)),
      personality: answers['recipient-personality'] || [],
      aesthetic: answers['aesthetic'] || [],
    },
    preferences: {
      budget_range: answers['budget'] || [],
      gift_type: answers['gift-type'] || [],
      specific_wants: answers['specific-wants'] || [],
    },
  };
}