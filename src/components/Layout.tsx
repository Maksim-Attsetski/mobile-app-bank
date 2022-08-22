import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

interface IProps {
  children: ReactNode;
  style?: any;
  isScroll?: boolean;
}

const Layout = ({ children, style, isScroll = false }: IProps) => {
  return (
    <SafeAreaView style={{ ...styles.container, ...style }}>
      {isScroll ? <ScrollView>{children}</ScrollView> : <View>{children}</View>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 35,
  },
});

export default Layout;
