import { LinearGradient } from 'expo-linear-gradient';
import { User } from 'firebase/auth';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Card from '../components/Card';
import Layout from '../components/Layout';
import AsyncAlert from '../components/UI/AsyncAlert';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Line from '../components/UI/Line';
import Loader from '../components/UI/Loader';
import { useAuth } from '../hooks/useAuth';
import useCard from '../hooks/useCard';
import { ICard } from '../types/card';
import { getBalance } from '../utils/getBalance';
import { getCardNameColor } from '../utils/getCardNameColor';
import { getDate } from '../utils/getDate';

const CardScreen: FC = ({ route, navigation }: any) => {
  const { allUsers } = useAuth();
  const { cards, cardIsLoading, transferMoney, deleteCard } = useCard();
  const [transfer, setTransfer] = useState<string>('');

  const mainCard: ICard = useMemo(
    () => cards.filter((item: ICard) => item.cardNumber === route.params.card.cardNumber)[0],
    [cards]
  );
  const otherCards: ICard[] = useMemo(
    () => cards.filter((item: ICard) => item.cardNumber !== route.params.card.cardNumber),
    [cards]
  );

  const createdAt: string = useMemo(() => (!mainCard ? '' : getDate(+mainCard.timestamp?.seconds * 1000)), [cards]);

  const handleDeleteCard = async () => {
    if (!mainCard) return;

    const isAgree = await AsyncAlert({
      title: 'Вы точно хотите удалить карту?',
      msg: `На балансе данной карты ${mainCard.balance} ${mainCard.currency}`,
      buttons: [
        { text: 'Да', resolve: true },
        { text: 'Нет', resolve: false },
      ],
    });

    if (isAgree) {
      navigation.navigate('Home');
      deleteCard(mainCard);
    }
  };

  const onChange = (value: string) => {
    const newValue: string = value.replace(/\D[^\.]/g, '');
    setTransfer(newValue);
  };

  const handleTransferCard = (receiverCard: ICard) => {
    transferMoney(mainCard, receiverCard, +transfer);
  };

  return cardIsLoading || !mainCard ? (
    <Loader />
  ) : (
    <Layout>
      <Button onPress={() => navigation.goBack()} style={styles.cardButton} filled>
        Назад
      </Button>
      <LinearGradient
        colors={getCardNameColor(mainCard.name)}
        start={{ x: 0.0, y: 0.45 }}
        end={{ x: 1, y: 1 }}
        style={{ ...styles.card }}
      >
        <Text style={styles.cardText}>{mainCard.cardNumber}</Text>
        <Text style={styles.cardType}>{mainCard.type}</Text>
        <Text style={styles.cardCurrency}>
          {mainCard.currency}, {mainCard.name}
        </Text>
      </LinearGradient>
      <View style={styles.content}>
        <Text style={styles.text}>Баланс: {getBalance(mainCard.balance, mainCard.currency)}</Text>
        <Text style={styles.text}>Сделано: {createdAt}</Text>
        <Button style={styles.cardButton} onPress={handleDeleteCard}>
          Удалить карту
        </Button>
        <Line />
        <Input
          value={transfer}
          onChangeText={(value: string) => onChange(value)}
          placeholder={'Введите сумму перевода...'}
          style={{ marginBottom: 10 }}
        />
        {otherCards.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {otherCards.map((item, i) => (
              <Card
                card={item}
                style={{ marginRight: 8 }}
                navigation={navigation}
                key={item.cardNumber}
                isOtherCard
                handleTransferCard={handleTransferCard}
              />
            ))}
          </ScrollView>
        ) : (
          <Text>У вас нет других карт</Text>
        )}

        <Line />

        {!!allUsers.length ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {allUsers.map((item: User) => (
              <View key={item.uid} style={styles.user}>
                <Text style={styles.avatar}>{item.displayName?.slice(0, 1)}</Text>
                <Text style={{ fontSize: 20, marginRight: 10, textTransform: 'capitalize' }}>{item.displayName}</Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text>нет других карт</Text>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 20,
    paddingBottom: 80,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: 'relative',
    marginVertical: 15,
  },
  cardButton: {
    alignSelf: 'flex-end',
  },
  cardType: {
    position: 'absolute',
    top: 20,
    right: 20,
    color: '#fff',
    letterSpacing: 1,
  },
  cardCurrency: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: '#fff',
    letterSpacing: 1,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
  },
  avatar: {
    fontSize: 24,
    textTransform: 'capitalize',
    backgroundColor: '#5460fe',
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
    color: '#fff',
    borderRadius: 100,
  },
  user: {
    backgroundColor: '#eee',
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 5,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15.2,
    paddingTop: 15,
  },
});

export default CardScreen;
