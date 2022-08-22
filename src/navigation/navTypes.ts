export type TypeNavigation = {
  Home: undefined;
  Exchanges: undefined;
  News: undefined;
};

interface IRoute {
  name: keyof TypeNavigation;
  text: 'Новости' | 'Курс' | 'Главная';
}

export const routeNames: IRoute[] = [
  { name: 'News', text: 'Новости' },
  { name: 'Home', text: 'Главная' },
  { name: 'Exchanges', text: 'Курс' },
];
