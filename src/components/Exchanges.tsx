import React, { FC, useState } from 'react';
import { Pressable, ScrollView, Text, StyleSheet } from 'react-native';
import useExchanges from '../hooks/useExchanges';
import { IExchange } from '../types/kurs';
import { getExchangesDate } from '../utils/getExchangesDate';
import ExchangeItem from './ExchangeItem';
import Loader from './UI/Loader';

const Exchanges: FC = () => {
  const { exchanges, isExchangesLoading } = useExchanges();
  const [activeExchange, setActiveExchange] = useState<IExchange | null>(null);

  return isExchangesLoading ? (
    <Loader size='small' />
  ) : (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {exchanges.map((item, i) => {
          const { day, time } = getExchangesDate(item.kurs_date_time);
          const isActive = activeExchange?.kurs_date_time === item.kurs_date_time;
          return (
            <Pressable
              onPress={() => setActiveExchange(item)}
              style={{
                ...styles.exchangeTime,
                ...(isActive ? styles.activeExchange : {}),
              }}
              key={i}
            >
              <Text style={{ ...(isActive ? styles.activeText : styles.text), fontSize: 36 }}>{day}</Text>
              <Text style={{ ...(isActive ? styles.activeText : styles.text) }}>{time}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      {!activeExchange && <Text>Выбери дату</Text>}
      {activeExchange ? <ExchangeItem exchange={activeExchange} /> : <ExchangeItem exchange={null} />}
    </>
  );
};

const styles = StyleSheet.create({
  exchangeTime: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 10,
    marginVertical: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  creditText: {
    color: '#111942',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  flex: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: '#111942',
  },
  activeText: {
    color: '#fff',
  },
  activeExchange: {
    backgroundColor: '#5460fe',
  },
});

export default Exchanges;
