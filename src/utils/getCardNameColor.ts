import { TypeCardName } from '../types/card';

export const getCardNameColor = (cardName: TypeCardName) => {
  switch (cardName) {
    case 'Airline':
      return '#5460fe';
    case 'All inclusive':
      return '#000';
    case 'Econom':
      return '#111942';
    default:
      break;
  }
};
