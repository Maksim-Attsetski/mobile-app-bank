import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IExchange } from '../types/kurs';

interface IProps {
  exchange: IExchange | null;
}

const ExchangeItem: FC<IProps> = ({ exchange }) => {
  return (
    <View style={styles.exchange}>
      <View style={{ ...styles.flex, marginBottom: 10 }}>
        <Text>Euro покупка: {exchange?.EURCARD_in || '---'}</Text>
        <Text>Euro продажа: {exchange?.EURCARD_out || '---'}</Text>
      </View>
      <View style={{ ...styles.flex, marginBottom: 10 }}>
        <Text>Usd покупка: {exchange?.USDCARD_in || '---'}</Text>
        <Text>Usd продажа: {exchange?.USDCARD_out || '---'}</Text>
      </View>

      <Text>Полная дата: {exchange?.kurs_date_time || '---'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  exchange: {
    backgroundColor: '#fefefe',
    borderRadius: 10,
    marginRight: 10,
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  flex: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default ExchangeItem;
