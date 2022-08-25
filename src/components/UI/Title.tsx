import React, { FC } from 'react';
import { View, Text, StyleSheet, StyleProp } from 'react-native';

interface IProps {
  text: string;
  style?: StyleProp<any>;
}

const Title: FC<IProps> = ({ text, style }) => {
  return (
    <View>
      <Text style={{ ...styles.title, ...style }}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111942',
  },
});

export default Title;
