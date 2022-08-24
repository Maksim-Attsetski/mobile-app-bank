import { TypeCurrency } from '../types/card';

export const getBalance = (balance: number, currency: TypeCurrency): string => {
  let num = balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${num} ${currency}`;
};
