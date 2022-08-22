import React, { FC, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import BankBranch from '../components/BankBranch';
import ExchangeItem from '../components/ExchangeItem';
import Exchanges from '../components/Exchanges';
import Layout from '../components/Layout';
import Line from '../components/UI/Line';
import Loader from '../components/UI/Loader';
import Title from '../components/UI/Title';
import useCredit from '../hooks/useCredit';
import useExchanges from '../hooks/useExchanges';
import { TypeNavigation } from '../navigation/navTypes';
import { ICredit } from '../types/credit';
import { IExchange } from '../types/kurs';
import { getExchangesDate } from '../utils/getExchangesDate';

interface INav {
  navigation: {
    navigate: (screen: keyof TypeNavigation, arg: any) => void;
  };
}

const ExchangesScreen = ({ navigation }: INav) => {
  const { credits, isCreditLoading } = useCredit();

  return (
    <Layout isScroll>
      <Title text={'Курс валют'} style={{ marginBottom: 10 }} />

      <Exchanges />
      <Line />

      <Title text={'Кредиты'} style={{ marginBottom: 10 }} />

      {isCreditLoading ? (
        <Loader size='small' />
      ) : (
        <ScrollView horizontal>
          {credits.map((credit: ICredit) => (
            <Pressable
              onPress={() => navigation.navigate('Credit', { credit })}
              key={credit.inf_id}
              style={{ ...styles.exchangeTime, width: 300 }}
            >
              <Text style={styles.creditText}>{credit.group_name_ru}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
      <Line />
      <BankBranch navigation={navigation} />
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

export default ExchangesScreen;
