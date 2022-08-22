import React, { FC } from 'react';
import { TextInput, StyleSheet, StyleProp } from 'react-native';

interface IProps {
  value: string;
  onChangeText: (value: string) => void;
  style?: StyleProp<any>;
  placeholder?: string;
}

const Input: FC<IProps> = ({ style, value, onChangeText, placeholder, ...props }) => {
  return (
    <TextInput
      {...props}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={{ ...styles.input, ...style }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: '#5460fe',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
});

export default Input;
