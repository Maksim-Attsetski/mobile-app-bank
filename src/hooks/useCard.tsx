import { onSnapshot, query, collection, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
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

  return {
    cardIsLoading,
    cards,
  };
};
export default useCard;
