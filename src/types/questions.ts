
export interface QuestionOption {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  title: string;
  options: QuestionOption[];
  multiple?: boolean;
  
  layout: 'standard-grid' | 'grid-with-footer' | 'split-sex-age' | 'balanced-five' | 'standard-grid-pc' | 'triple-column';
}
export const questions: Question[] = [
  // Q1: Occasion - 4 items + "Other" footer
  {
    id: 'occasion',
    title: 'What is the occasion for the gift?',
    multiple: true,
    layout: 'grid-with-footer', 
    options: [
      { id: 'birthday', label: 'Birthday' },
      { id: 'anniversary', label: 'Anniversary' },
      { id: 'holiday', label: 'Holiday' },
      { id: 'graduation', label: 'Graduation' },
      { id: 'other', label: 'Other (please specify)' },
    ],
  },
  // Q2: Relationship - 4 items + "Other" footer (Matches Q1 style)
  {
    id: 'recipient-relationship',
    title: 'Who is the recipient to you?',
    multiple: true,
    layout: 'grid-with-footer', 
    options: [
      { id: 'friend', label: 'Friend' },
      { id: 'family-member', label: 'Family Member' },
      { id: 'significant-other', label: 'Significant Other' },
      { id: 'colleague', label: 'Colleague' },
      { id: 'other', label: 'Other (please specify)' },
    ],
  },
  // Q3: Interests - Standard dense grid
  {
    id: 'interests',
    title: 'What are the interests or hobbies of the recipient?',
    multiple: true,
    layout: 'standard-grid', 
    options: [
      { id: 'sport-fitness', label: 'Sport & Fitness' },
      { id: 'music-entertainment', label: 'Music & Entertainment' },
      { id: 'travel-adventure', label: 'Travel & Adventure' },
      { id: 'arts-crafts', label: 'Arts & Crafts' },
      { id: 'food-cooking', label: 'Food & Cooking' },
      { id: 'fashion-beauty', label: 'Fashion & Beauty' },
      { id: 'technology-gadgets', label: 'Technology & Gadgets' },
      { id: 'kids-toys', label: 'Kids & Toys' },
      { id: 'other', label: 'Other (please specify)' },
    ],
  },
  // Q4: Demographics - Split Layout (Sex vs Age)
 {
    id: 'demographics',
    title: 'What is the sex and age range of the recipient?',
    multiple: true,
    layout: 'split-sex-age', 
    options: [
      { id: 'male', label: 'Male' },
      { id: 'female', label: 'Female' },
      { id: 'under-18', label: 'Under 18' },
      { id: '18-30', label: '18 - 30' },
      { id: '31-45', label: '31 - 45' },
      { id: '46-60', label: '46 - 60' },
      { id: 'over-60', label: 'Over 60' },
    ],
  },
  // Q5: Budget - Balanced Layout (3 top, 2 bottom)
  {
    id: 'budget',
    title: 'What is your budget for the gift?',
    multiple: true,
    layout: 'balanced-five', 
    options: [
      { id: 'under-25k', label: 'Less than ₦25,000' },
      { id: '25k-50k', label: '₦25,000 - ₦50,000' },
      { id: '50k-100k', label: '₦50,000 - ₦100,000' },
      { id: '100k-200k', label: '₦100,000 - ₦200,000' },
      { id: 'over-200k', label: 'More than ₦200,000' },
    ],
  },
  // Q6: Aesthetic - Standard
  {
    id: 'aesthetic',
    title: 'Is there a specific style or aesthetic the recipient prefers?',
    multiple: true,
    layout: 'standard-grid-pc',
    options: [
      { id: 'classic', label: 'Classic' },
      { id: 'modern', label: 'Modern' },
      { id: 'vintage', label: 'Vintage' },
      { id: 'minimalist', label: 'Minimalist' },
      { id: 'bohemian', label: 'Bohemian' },
      { id: 'eclectic', label: 'Eclectic' },
      { id: 'other', label: 'Other (please specify)' },
    ],
  },
  // Q7: Personality - Standard
  {
    id: 'recipient-personality',
    title: 'How would you describe your recipient?',
    multiple: true,
    layout: 'standard-grid',
    options: [
      { id: 'luxurious', label: 'Luxurious' },
      { id: 'simple', label: 'Simple' },
      { id: 'middle-class', label: 'Middle-Class' },
      { id: 'appreciative', label: 'Appreciative' },
    ],
  },
  // Q8: Gift Type - Standard
  {
    id: 'gift-type',
    title: 'Would the recipient prefer a tangible gift, an experience, or something else?',
    multiple: true,
    layout: 'triple-column',
    options: [
      { id: 'tangible', label: 'Tangible gift' },
      { id: 'experience', label: 'Experience (e.g Tickets, Vouchers)' },
      { id: 'other', label: 'Other (please specify)' },
    ],
  },
  // Q9: Specific Wants - Standard
  {
    id: 'specific-wants',
    title: 'Are there any specific brands or products the recipient has mentioned wanting?',
    multiple: true,
    layout: 'standard-grid-pc',
    options: [
      { id: 'clothing-accessories', label: 'Clothing & Accessories' },
      { id: 'electronics-gadgets', label: 'Electronics & Gadgets' },
      { id: 'beauty-skincare', label: 'Beauty & Skincare' },
      { id: 'home-decor', label: 'Home Décor' },
      { id: 'sport-outdoor', label: 'Sport & Outdoor gear' },
      { id: 'none', label: 'None' },
      { id: 'other', label: 'Other (please specify)' },
    ],
  }
];