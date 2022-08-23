import React, { FC } from 'react';
import { TextInput, StyleSheet, StyleProp } from 'react-native';

interface IProps {
  value: string;
  onChangeText: (value: string) => void;
  style?: StyleProp<any>;
  placeholder?: string;
  isSecure?: boolean;
  defaultValue?: string;
}

const Input: FC<IProps> = ({
  style,
  defaultValue = '',
  value,
  onChangeText,
  placeholder,
  isSecure = false,
  ...props
}) => {
  return (
    <TextInput
      {...props}
      value={value}
      defaultValue={defaultValue}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={isSecure}
      autoCapitalize='none'
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
