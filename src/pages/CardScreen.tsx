import { LinearGradient } from 'expo-linear-gradient';
import { FC, useMemo } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Card from '../components/Card';
import Layout from '../components/Layout';
import AsyncAlert from '../components/UI/AsyncAlert';
import Button from '../components/UI/Button';
import Line from '../components/UI/Line';
import Loader from '../components/UI/Loader';
import useCard from '../hooks/useCard';
import { ICard } from '../types/card';
import { getBalance } from '../utils/getBalance';
import { getCardNameColor } from '../utils/getCardNameColor';
import { getDate } from '../utils/getDate';

const CardScreen: FC = ({ route, navigation }: any) => {
  const { deleteCard, cards, cardIsLoading } = useCard();

  const card: ICard = useMemo(() => cards.filter(item => item.cardNumber === route.params.card.cardNumber)[0], [cards]);
  const otherCards: ICard[] = useMemo(
    () => cards.filter(item => item.cardNumber !== route.params.card.cardNumber),
    [cards]
  );

  const createdAt: string = useMemo(() => (!card ? '' : getDate(+card.timestamp?.seconds * 1000)), [cards]);

  const handleDeleteCard = async () => {
    if (!card) return;

    const isAgree = await AsyncAlert({
      title: 'Вы точно хотите удалить карту?',
      msg: `На балансе данной карты ${card.balance} ${card.currency}`,
      buttons: [
        { text: 'Да', resolve: true },
        { text: 'Нет', resolve: false },
      ],
    });

    if (isAgree) {
      navigation.navigate('Home');
      deleteCard(card);
    }
  };

  return cardIsLoading || !card ? (
    <Loader />
  ) : (
    <Layout>
      <Button onPress={() => navigation.goBack()} style={styles.cardButton} filled>
        Назад
      </Button>
      <LinearGradient
        colors={getCardNameColor(card.name)}
        start={{ x: 0.0, y: 0.45 }}
        end={{ x: 1, y: 1 }}
        style={{ ...styles.card }}
      >
        <Text style={styles.cardText}>{card.cardNumber}</Text>
        <Text style={styles.cardType}>{card.type}</Text>
        <Text style={styles.cardCurrency}>
          {card.currency}, {card.name}
        </Text>
      </LinearGradient>
      <View style={styles.content}>
        <Text style={styles.text}>Баланс: {getBalance(card.balance, card.currency)}</Text>
        <Text style={styles.text}>Сделано: {createdAt}</Text>
        <Button style={styles.cardButton} onPress={handleDeleteCard}>
          Удалить карту
        </Button>
        <Line />
        {otherCards.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {otherCards.map(item => (
              <Card card={item} navigation={navigation} key={card.cardNumber} isOtherCard />
            ))}
          </ScrollView>
        ) : (
          <Text>У вас нет других карт</Text>
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
