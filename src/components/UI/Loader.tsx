import { LinearGradient } from 'expo-linear-gradient';
import React, { FC } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';

interface IProps {
  size?: 'large' | 'small';
}

const Loader: FC<IProps> = ({ size = 'large' }) => {
  return size === 'large' ? (
    <LinearGradient
      colors={['#accbee', '#e7f0fd']}
      style={{ flex: 1 }}
      start={{ x: 0.0, y: 0.45 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size={'large'} color={'#5460fe'} />
      </SafeAreaView>
    </LinearGradient>
  ) : (
    <ActivityIndicator size={'large'} color={'#5460fe'} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    transform: [{ scale: 4 }],
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
