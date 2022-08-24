import { TypeCardName } from '../types/card';

export const getCardNameColor = (cardName: TypeCardName): string[] => {
  switch (cardName) {
    case 'Airline':
      return ['#ff9a9e', '#fad0c4'];
    case 'All inclusive':
      return ['#009efd', '#2af598'];
    case 'Econom':
      return ['#09203f', '#537895'];
    default:
      return ['#09203f', '#09203f'];
  }
};
