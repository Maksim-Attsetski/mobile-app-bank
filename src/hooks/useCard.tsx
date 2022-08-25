import { User } from 'firebase/auth';
import { onSnapshot, query, collection, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncAlert from '../components/UI/AsyncAlert';
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

  const transferMoney = async (sender: ICard, receiver: ICard, sum: number) => {
    setCardIsLoading(false);
    try {
      await updateDoc(doc(fs, 'cards', sender.uid), {
        balance: sender.balance - sum,
      });
      await updateDoc(doc(fs, 'cards', receiver.uid), {
        balance: receiver.balance + sum,
      });
    } catch (error: any) {
      console.log(error);
    } finally {
      setCardIsLoading(false);
    }
  };

  // const getAllCards = async (card: ICard) => {
  //   try {
  //     const qCard = query(collection(fs, 'cards'), where('userId', '!=', card.userId));
  //     const unsubscribe = onSnapshot(qCard, querySnapshot => {
  //       let allCards: ICard[] = [];

  //       querySnapshot.forEach(doc => {
  //         allCards.push({
  //           ...(doc.data() as ICard),
  //           uid: doc.id,
  //         });
  //       });

  //       // const cardNums = allCards.filter(
  //       //   (item, index, array) => array.findIndex((item2: ICard) => item2.cardNumber === item.cardNumber) === index
  //       // );
  //       // console.log(cardNums);

  //       // setAllCards(cardNums);

  //       const qUser = query(collection(fs, 'users'), where('uid', '!=', user?.uid));
  //       const querySnap = onSnapshot(qUser, querySnapshot => {
  //         let users: User[] = [];

  //         querySnapshot.forEach(doc => {
  //           users.push({
  //             ...(doc.data() as User),
  //             uid: doc.id,
  //           });
  //         });

  //         console.log(users);
  //       });
  //     });
  //   } catch (error) {}
  // };

  return {
    cardIsLoading,
    cards,
    deleteCard,
    transferMoney,
  };
};
export default useCard;
