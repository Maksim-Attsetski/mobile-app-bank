import React, { FC } from 'react';
import { Text, View } from 'react-native';
import Layout from '../components/Layout';
import Title from '../components/UI/Title';

const HomeScreen: FC = () => {
  return (
    <Layout>
      <Title text='Главная' />

      <Text>Это мое первое приложение на React Native</Text>
    </Layout>
  );
};

export default HomeScreen;
