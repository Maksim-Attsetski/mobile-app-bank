export type TypeCurrency = 'USD' | 'RUB' | 'BYN';
export type TypeCardName = 'Airline' | 'All inclusive' | 'Econom';
export type TypeCardType = 'Maestro' | 'MasterCard' | 'Visa' | 'Mir';

export interface ICard {
  timestamp: any;
  userId: string;
  balance: number;
  cardNumber: string;
  currency: TypeCurrency;
  name: TypeCardName;
  type: TypeCardType;
}
