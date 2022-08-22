import React, { FC } from 'react';
import { StyleProp, StyleSheet, View } from 'react-native';

interface IProps {
  style?: StyleProp<any>;
}

const Line: FC<IProps> = ({ style = { marginVertical: 15 } }) => {
  return <View style={{ ...styles.line, ...style }} />;
};

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 2,
    borderRadius: 15,
    backgroundColor: '#5460fe',
  },
});

export default Line;
