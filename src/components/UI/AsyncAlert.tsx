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
  buttons: IButtons[];
  cancelable?: boolean;
}

const AsyncAlert = ({ title, msg, buttons, cancelable = true }: IProps): Promise<IResolve> =>
  new Promise(resolve => {
    Alert.alert(
      title,
      msg,
      buttons.map(btn => ({
        text: btn.text,
        onPress: () => {
          resolve(btn.resolve);
        },
      })),
      { cancelable }
    );
  });

export default AsyncAlert;
