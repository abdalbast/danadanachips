export type QuizAnswers = {
  crunch?: 'light' | 'big' | 'extraPuffy';
  heat?: 'mild' | 'medium' | 'fire';
  mood?: 'movieNight' | 'studyFuel' | 'onTheGo' | 'party';
};

export type ProductMatch = {
  puffType: string;
  heatLevel: number;
};

/**
 * Quiz logic to match user answers to product attributes
 */
export function calculateProductMatch(answers: QuizAnswers): ProductMatch {
  // Map crunch preference to puff type
  const puffTypeMap = {
    light: 'light',
    big: 'big',
    extraPuffy: 'extra-puffy',
  };

  // Map heat preference to heat level
  const heatLevelMap = {
    mild: 1,
    medium: 2,
    fire: 3,
  };

  // Mood can influence recommendations but doesn't directly map
  // For now, we'll use it as a secondary filter or for marketing copy
  const moodContext = {
    movieNight: 'Perfect for your next movie night!',
    studyFuel: 'Fuel your study sessions with these!',
    onTheGo: 'Great for snacking on the go!',
    party: 'Party-perfect flavours!',
  };

  return {
    puffType: puffTypeMap[answers.crunch || 'big'],
    heatLevel: heatLevelMap[answers.heat || 'mild'],
  };
}

/**
 * Filter products based on quiz results
 */
export function filterProductsByQuiz<T extends { puffType: string; heatLevel: number }>(
  products: T[],
  match: ProductMatch
): T[] {
  return products.filter(
    (product) =>
      product.puffType === match.puffType && product.heatLevel === match.heatLevel
  );
}

/**
 * Get a recommendation message based on mood
 */
export function getMoodMessage(mood?: QuizAnswers['mood']): string {
  const messages = {
    movieNight: 'Perfect for your next movie night!',
    studyFuel: 'Fuel your study sessions with these crunchy treats!',
    onTheGo: 'Grab these on the go for a quick snack!',
    party: 'Party-perfect flavours that everyone will love!',
  };

  return mood ? messages[mood] : 'These flavours are perfect for you!';
}

