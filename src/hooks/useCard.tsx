import { onSnapshot, query, collection, where, doc, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncAlert from '../components/UI/AsyncAlert';
import AsyncPrompt from '../components/UI/AsyncPrompt';
import { fs } from '../firebase/firebase';
import { ICard } from '../types/card';
import { useAuth } from './useAuth';

const useCard = () => {
  const [cardIsLoading, setCardIsLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    if (!user) return;
    setCardIsLoading(true);

    onSnapshot(query(collection(fs, 'cards'), where('userId', '==', user.uid)), snapshot => {
      const cards: ICard[] = snapshot.docs.map(doc => ({
        ...(doc.data() as ICard),
        uid: doc.id,
      }));
      setCards([...cards]);
    });

    setCardIsLoading(false);
  }, [user]);

  const deleteCard = async (card: ICard) => {
    if (!user) return;

    await deleteDoc(doc(fs, 'cards', card.uid));
  };

  const transferMoney = async (sender: ICard, receiver: ICard) => {
    // const sum = AsyncPrompt({
    //   title: 'Какую сумму хотите перевести',
    //   msg: `У вас на балансе ${sender.balance}`,
    // });

    const sum = Alert.prompt('Какую сумму хотите перевести', `У вас на балансе ${sender.balance}`);

    console.log(sum);
  };

  return {
    cardIsLoading,
    cards,
    deleteCard,
    transferMoney,
  };
};
export default useCard;
