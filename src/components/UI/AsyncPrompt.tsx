import { Alert } from 'react-native';
import { TypeCardName, TypeCardType, TypeCurrency } from '../../types/card';

type IResolve = TypeCardName | TypeCurrency | TypeCardType | boolean;

interface IButtons {
  text: string;
  resolve: IResolve;
}

interface IProps {
  title: string;
  msg?: string;
  buttons?: IButtons[];
}

const AsyncPrompt = ({ title, msg, buttons }: IProps): Promise<IResolve> =>
  new Promise(resolve => {
    Alert.prompt(title, msg);
  });

export default AsyncPrompt;
