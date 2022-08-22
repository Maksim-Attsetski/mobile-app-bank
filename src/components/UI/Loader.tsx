import React, { FC } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';

interface IProps {
  size?: 'large' | 'small';
}

const Loader: FC<IProps> = ({ size = 'large' }) => {
  return (
    <SafeAreaView style={size === 'large' ? styles.container : {}}>
      <ActivityIndicator size={'large'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    transform: [{ scale: 4 }],
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
