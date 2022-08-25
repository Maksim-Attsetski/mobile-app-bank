import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

interface IProps {
  children: ReactNode;
  style?: any;
  isScroll?: boolean;
}

const Layout = ({ children, style, isScroll = false }: IProps) => {
  const colors = ['#accbee', '#e7f0fd'];
  return (
    <LinearGradient colors={colors} style={{ flex: 1 }} start={{ x: 0.0, y: 0.45 }} end={{ x: 1, y: 1 }}>
      <SafeAreaView style={{ ...styles.container, ...style }}>
        {isScroll ? <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView> : <View>{children}</View>}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 35,
    paddingBottom: 10,
  },
});

export default Layout;
