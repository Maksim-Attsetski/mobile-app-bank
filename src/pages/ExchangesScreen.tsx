import axios from 'axios';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import ExchangeItem from '../components/ExchangeItem';
import Layout from '../components/Layout';
import Loader from '../components/UI/Loader';
import Title from '../components/UI/Title';
import useExchanges from '../hooks/useExchanges';
import { IExchange } from '../types/kurs';
import { getExchangesDate } from '../utils/getExchangesDate';

const ExchangesScreen: FC = () => {
  const { exchanges, isExchangesLoading } = useExchanges();
  const [activeExchange, setActiveExchange] = useState<IExchange | null>(null);

  return isExchangesLoading ? (
    <Loader />
  ) : (
    <Layout>
      <Title text={'Курс валют'} style={{ marginBottom: 10 }} />
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
      {activeExchange ? <ExchangeItem exchange={activeExchange} /> : <ExchangeItem exchange={null} />}
    </Layout>
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

export default ExchangesScreen;
