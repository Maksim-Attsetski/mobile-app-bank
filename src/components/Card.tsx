import { LinearGradient } from 'expo-linear-gradient';
import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import useCard from '../hooks/useCard';
import { ICard } from '../types/card';
import { getBalance } from '../utils/getBalance';
import { getCardNameColor } from '../utils/getCardNameColor';

interface IProps {
  card: ICard;
  navigation: any;
  isOtherCard?: boolean;
}

const Card: FC<IProps> = ({ card, navigation, isOtherCard = false }) => {
  const { transferMoney } = useCard();

  const handleTransferCard = () => {
    console.log('send');

    transferMoney(card, card);
  };

  return (
    <View key={card.cardNumber}>
      <LinearGradient
        colors={getCardNameColor(card.name)}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 1.8, y: 1 }}
        style={{ ...styles.card }}
      >
        <View style={styles.flex}>
          <View>
            <Text style={{ ...styles.text, marginBottom: 3 }}>Баланс: {getBalance(card.balance, card.currency)}</Text>
            {!isOtherCard ? (
              <TouchableOpacity onPress={() => navigation.navigate('Card', { card })}>
                <Text style={styles.text}>Открыть</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleTransferCard}>
                <Text style={styles.text}>Перести деньги</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.text}>{card.cardNumber.slice(-4)}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 10,
    minWidth: Dimensions.get('window').width * 0.82,
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

export default Card;
