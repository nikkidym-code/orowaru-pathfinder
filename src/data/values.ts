export interface Value {
  id: string;
  name: string;
  category: string;
}

export interface ValueCategory {
  id: string;
  name: string;
  values: Value[];
}

export const valueCategories: ValueCategory[] = [
  {
    id: 'personal-growth',
    name: 'Personal Growth & Self-Development',
    values: [
      { id: 'achievement', name: 'Achievement', category: 'Personal Growth & Self-Development' },
      { id: 'ambition', name: 'Ambition', category: 'Personal Growth & Self-Development' },
      { id: 'authenticity', name: 'Authenticity', category: 'Personal Growth & Self-Development' },
      { id: 'confidence', name: 'Confidence', category: 'Personal Growth & Self-Development' },
      { id: 'courage', name: 'Courage', category: 'Personal Growth & Self-Development' },
      { id: 'curiosity', name: 'Curiosity', category: 'Personal Growth & Self-Development' },
      { id: 'growth', name: 'Growth', category: 'Personal Growth & Self-Development' },
      { id: 'initiative', name: 'Initiative', category: 'Personal Growth & Self-Development' },
      { id: 'integrity', name: 'Integrity', category: 'Personal Growth & Self-Development' },
      { id: 'knowledge', name: 'Knowledge', category: 'Personal Growth & Self-Development' },
      { id: 'learning', name: 'Learning', category: 'Personal Growth & Self-Development' },
      { id: 'perseverance', name: 'Perseverance', category: 'Personal Growth & Self-Development' },
      { id: 'resourcefulness', name: 'Resourcefulness', category: 'Personal Growth & Self-Development' },
      { id: 'self-discipline', name: 'Self-discipline', category: 'Personal Growth & Self-Development' },
      { id: 'self-expression', name: 'Self-expression', category: 'Personal Growth & Self-Development' },
      { id: 'self-respect', name: 'Self-respect', category: 'Personal Growth & Self-Development' },
      { id: 'vision', name: 'Vision', category: 'Personal Growth & Self-Development' },
      { id: 'wisdom', name: 'Wisdom', category: 'Personal Growth & Self-Development' },
    ]
  },
  {
    id: 'relationships-community',
    name: 'Relationships & Community',
    values: [
      { id: 'belonging', name: 'Belonging', category: 'Relationships & Community' },
      { id: 'caring', name: 'Caring', category: 'Relationships & Community' },
      { id: 'collaboration', name: 'Collaboration', category: 'Relationships & Community' },
      { id: 'commitment', name: 'Commitment', category: 'Relationships & Community' },
      { id: 'community', name: 'Community', category: 'Relationships & Community' },
      { id: 'compassion', name: 'Compassion', category: 'Relationships & Community' },
      { id: 'connection', name: 'Connection', category: 'Relationships & Community' },
      { id: 'cooperation', name: 'Cooperation', category: 'Relationships & Community' },
      { id: 'friendship', name: 'Friendship', category: 'Relationships & Community' },
      { id: 'generosity', name: 'Generosity', category: 'Relationships & Community' },
      { id: 'giving-back', name: 'Giving back', category: 'Relationships & Community' },
      { id: 'inclusion', name: 'Inclusion', category: 'Relationships & Community' },
      { id: 'kindness', name: 'Kindness', category: 'Relationships & Community' },
      { id: 'leadership-rel', name: 'Leadership', category: 'Relationships & Community' },
      { id: 'loyalty', name: 'Loyalty', category: 'Relationships & Community' },
      { id: 'parenting', name: 'Parenting', category: 'Relationships & Community' },
      { id: 'service', name: 'Service', category: 'Relationships & Community' },
      { id: 'teamwork', name: 'Teamwork', category: 'Relationships & Community' },
      { id: 'trust', name: 'Trust', category: 'Relationships & Community' },
    ]
  },
  {
    id: 'values-principles',
    name: 'Values & Principles',
    values: [
      { id: 'accountability', name: 'Accountability', category: 'Values & Principles' },
      { id: 'altruism', name: 'Altruism', category: 'Values & Principles' },
      { id: 'contribution', name: 'Contribution', category: 'Values & Principles' },
      { id: 'dignity-vp', name: 'Dignity', category: 'Values & Principles' },
      { id: 'equality', name: 'Equality', category: 'Values & Principles' },
      { id: 'ethics', name: 'Ethics', category: 'Values & Principles' },
      { id: 'excellence-vp', name: 'Excellence', category: 'Values & Principles' },
      { id: 'fairness', name: 'Fairness', category: 'Values & Principles' },
      { id: 'forgiveness', name: 'Forgiveness', category: 'Values & Principles' },
      { id: 'grace-vp', name: 'Grace', category: 'Values & Principles' },
      { id: 'gratitude', name: 'Gratitude', category: 'Values & Principles' },
      { id: 'honesty', name: 'Honesty', category: 'Values & Principles' },
      { id: 'humility', name: 'Humility', category: 'Values & Principles' },
      { id: 'justice', name: 'Justice', category: 'Values & Principles' },
      { id: 'respect', name: 'Respect', category: 'Values & Principles' },
      { id: 'responsibility', name: 'Responsibility', category: 'Values & Principles' },
      { id: 'stewardship', name: 'Stewardship', category: 'Values & Principles' },
      { id: 'truth', name: 'Truth', category: 'Values & Principles' },
    ]
  },
  {
    id: 'wellbeing-inner',
    name: 'Well-being & Inner Life',
    values: [
      { id: 'balance-wb', name: 'Balance', category: 'Well-being & Inner Life' },
      { id: 'beauty', name: 'Beauty', category: 'Well-being & Inner Life' },
      { id: 'contentment', name: 'Contentment', category: 'Well-being & Inner Life' },
      { id: 'dignity-wb', name: 'Dignity', category: 'Well-being & Inner Life' },
      { id: 'faith', name: 'Faith', category: 'Well-being & Inner Life' },
      { id: 'grace-wb', name: 'Grace', category: 'Well-being & Inner Life' },
      { id: 'harmony', name: 'Harmony', category: 'Well-being & Inner Life' },
      { id: 'health', name: 'Health', category: 'Well-being & Inner Life' },
      { id: 'hope', name: 'Hope', category: 'Well-being & Inner Life' },
      { id: 'joy', name: 'Joy', category: 'Well-being & Inner Life' },
      { id: 'love', name: 'Love', category: 'Well-being & Inner Life' },
      { id: 'optimism', name: 'Optimism', category: 'Well-being & Inner Life' },
      { id: 'patience', name: 'Patience', category: 'Well-being & Inner Life' },
      { id: 'peace', name: 'Peace', category: 'Well-being & Inner Life' },
      { id: 'personal-fulfillment', name: 'Personal fulfillment', category: 'Well-being & Inner Life' },
      { id: 'serenity', name: 'Serenity', category: 'Well-being & Inner Life' },
      { id: 'simplicity', name: 'Simplicity', category: 'Well-being & Inner Life' },
      { id: 'spirituality', name: 'Spirituality', category: 'Well-being & Inner Life' },
      { id: 'vulnerability', name: 'Vulnerability', category: 'Well-being & Inner Life' },
      { id: 'well-being', name: 'Well-being', category: 'Well-being & Inner Life' },
      { id: 'wholeheartedness', name: 'Wholeheartedness', category: 'Well-being & Inner Life' },
    ]
  },
  {
    id: 'work-achievement',
    name: 'Work & Achievement',
    values: [
      { id: 'being-best', name: 'Being the best', category: 'Work & Achievement' },
      { id: 'career', name: 'Career', category: 'Work & Achievement' },
      { id: 'competence', name: 'Competence', category: 'Work & Achievement' },
      { id: 'efficiency', name: 'Efficiency', category: 'Work & Achievement' },
      { id: 'excellence-wa', name: 'Excellence', category: 'Work & Achievement' },
      { id: 'job-security', name: 'Job security', category: 'Work & Achievement' },
      { id: 'making-difference', name: 'Making a difference', category: 'Work & Achievement' },
      { id: 'power', name: 'Power', category: 'Work & Achievement' },
      { id: 'pride', name: 'Pride', category: 'Work & Achievement' },
      { id: 'recognition', name: 'Recognition', category: 'Work & Achievement' },
      { id: 'reliability', name: 'Reliability', category: 'Work & Achievement' },
      { id: 'security', name: 'Security', category: 'Work & Achievement' },
      { id: 'success', name: 'Success', category: 'Work & Achievement' },
      { id: 'usefulness', name: 'Usefulness', category: 'Work & Achievement' },
    ]
  },
  {
    id: 'lifestyle-experience',
    name: 'Lifestyle & Experience',
    values: [
      { id: 'adventure', name: 'Adventure', category: 'Lifestyle & Experience' },
      { id: 'balance-le', name: 'Balance', category: 'Lifestyle & Experience' },
      { id: 'environment', name: 'Environment', category: 'Lifestyle & Experience' },
      { id: 'family', name: 'Family', category: 'Lifestyle & Experience' },
      { id: 'financial-stability', name: 'Financial stability', category: 'Lifestyle & Experience' },
      { id: 'freedom', name: 'Freedom', category: 'Lifestyle & Experience' },
      { id: 'future-generations', name: 'Future generations', category: 'Lifestyle & Experience' },
      { id: 'home', name: 'Home', category: 'Lifestyle & Experience' },
      { id: 'independence', name: 'Independence', category: 'Lifestyle & Experience' },
      { id: 'leisure', name: 'Leisure', category: 'Lifestyle & Experience' },
      { id: 'legacy', name: 'Legacy', category: 'Lifestyle & Experience' },
      { id: 'nature', name: 'Nature', category: 'Lifestyle & Experience' },
      { id: 'order', name: 'Order', category: 'Lifestyle & Experience' },
      { id: 'safety', name: 'Safety', category: 'Lifestyle & Experience' },
      { id: 'sportsmanship', name: 'Sportsmanship', category: 'Lifestyle & Experience' },
      { id: 'thrift', name: 'Thrift', category: 'Lifestyle & Experience' },
      { id: 'time', name: 'Time', category: 'Lifestyle & Experience' },
      { id: 'tradition', name: 'Tradition', category: 'Lifestyle & Experience' },
      { id: 'travel', name: 'Travel', category: 'Lifestyle & Experience' },
      { id: 'wealth', name: 'Wealth', category: 'Lifestyle & Experience' },
    ]
  },
  {
    id: 'enjoyment-lightness',
    name: 'Enjoyment & Lightness',
    values: [
      { id: 'fun', name: 'Fun', category: 'Enjoyment & Lightness' },
      { id: 'humor', name: 'Humor', category: 'Enjoyment & Lightness' },
      { id: 'openness', name: 'Openness', category: 'Enjoyment & Lightness' },
      { id: 'uniqueness', name: 'Uniqueness', category: 'Enjoyment & Lightness' },
    ]
  }
];