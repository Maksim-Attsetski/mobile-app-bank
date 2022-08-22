import { TypeNavigation } from './src/navigation/navTypes';

declare global {
  namespace ReactNavigation {
    interface RootNavigationList extends TypeNavigation {}
  }
}
