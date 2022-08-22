export type TypeNavigation = {
  Home: undefined;
  Exchanges: undefined;
  News: undefined;
  Credit: undefined;
  BankBranch: undefined;
};

export interface IRoute {
  name: keyof TypeNavigation;
  text: 'Новости' | 'Курс' | 'Главная';
}

export const routeNames: IRoute[] = [
  { name: 'News', text: 'Новости' },
  { name: 'Home', text: 'Главная' },
  { name: 'Exchanges', text: 'Курс' },
];
