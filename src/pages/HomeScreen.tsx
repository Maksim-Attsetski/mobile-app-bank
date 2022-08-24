import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Layout from '../components/Layout';
import AsyncAlert from '../components/UI/AsyncAlert';
import Button from '../components/UI/Button';
import Line from '../components/UI/Line';
import Loader from '../components/UI/Loader';
import Title from '../components/UI/Title';
import { useAuth } from '../hooks/useAuth';
import useCard from '../hooks/useCard';
import { ICard } from '../types/card';
import { getCardNameColor } from '../utils/getCardNameColor';
import { getCardNumber } from '../utils/getCardNumber';
import { fs } from '../firebase/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { getBalance } from '../utils/getBalance';

const HomeScreen: FC = () => {
  const { cards, cardIsLoading } = useCard();
  const { user } = useAuth();

  const addNewCard = async () => {
    try {
      // @ts-ignore
      const cardName: TypeCardName = await AsyncAlert({
        title: 'Какая карту хотите оформить?',
        buttons: [
          { text: 'Airline', resolve: 'Airline' },
          { text: 'All inclusive', resolve: 'All inclusive' },
          { text: 'Econom', resolve: 'Econom' },
        ],
      });
      // @ts-ignore
      const cardType: TypeCardType = await AsyncAlert({
        title: 'Выберите тип карты',
        buttons: [
          { text: 'Maestro', resolve: 'Maestro' },
          { text: 'MasterCard', resolve: 'MasterCard' },
          { text: 'Mir', resolve: 'Mir' },
          { text: 'Visa', resolve: 'Visa' },
        ],
      });
      // @ts-ignore
      const currency: TypeCurrency = await AsyncAlert({
        title: 'Выберите валюту',
        buttons: [
          { text: 'USD', resolve: 'BYN' },
          { text: 'RUB', resolve: 'RUB' },
          { text: 'BYN', resolve: 'BYN' },
        ],
      });

      if (!!currency && !!cardType && !!cardName && !!user) {
        const newCard: ICard = {
          timestamp: serverTimestamp(),
          balance: 0,
          cardNumber: getCardNumber(),
          currency,
          name: cardName,
          type: cardType,
          userId: user.uid,
        };

        await addDoc(collection(fs, 'cards'), newCard);
      } else {
        console.log('Увы и ах');
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Title text='Главная' />
      <Text>Это мое первое приложение на React Native</Text>

      <Line />

      {!!user ? (
        <View>
          {cardIsLoading ? (
            <Loader size='small' />
          ) : (
            <View>
              <Button onPress={addNewCard}>Добавить карту</Button>
              <Line />
              {cards.length === 0 ? (
                <Text>Нет карт</Text>
              ) : (
                cards.map(card => (
                  <View key={card.cardNumber}>
                    <LinearGradient
                      colors={getCardNameColor(card.name)}
                      start={{ x: 0.0, y: 0.25 }}
                      end={{ x: 1.8, y: 1 }}
                      style={{ ...styles.card }}
                    >
                      <View style={styles.flex}>
                        <Text style={styles.text}>Баланс: {getBalance(card.balance, card.currency)}</Text>
                        <Text style={styles.text}>{card.cardNumber.slice(-4)}</Text>
                      </View>
                    </LinearGradient>
                  </View>
                ))
              )}
            </View>
          )}
        </View>
      ) : (
        <Text>Вы не авторизованы для просмотра карт</Text>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
