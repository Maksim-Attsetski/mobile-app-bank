import { TypeCardName } from '../types/card';

export const getCardNameColor = (cardName: TypeCardName): string[] => {
  switch (cardName) {
    case 'Airline':
      return ['#5460fe', '#ffeaa7'];
    case 'All inclusive':
      return ['#6c5ce7', '#ffeaa7'];
    case 'Econom':
      return ['#111942', '#5460fe'];
    default:
      return ['#111942', '#5460fe'];
  }
};
