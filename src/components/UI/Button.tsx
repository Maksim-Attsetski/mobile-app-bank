import React, { FC, ReactNode } from 'react';
import { Pressable, StyleProp, StyleSheet, Text } from 'react-native';

interface IProps {
  children: ReactNode;
  onPress: (arg?: any) => void;
  style?: StyleProp<any>;
  textStyle?: StyleProp<any>;
  filled?: boolean;
}

const Button: FC<IProps> = ({ children, onPress, style, textStyle, filled = false, ...props }) => {
  const filledStyles = filled ? { ...styles.filled } : { ...styles.notFilled };
  return (
    <Pressable onPress={onPress} style={{ ...styles.link, ...filledStyles, ...style }} {...props}>
      <Text style={{ ...textStyle }}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  link: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 7,
    fontSize: 18,
    marginHorizontal: 7,
    alignSelf: 'center',
    letterSpacing: 1,
  },
  filled: {
    backgroundColor: '#fff',
  },
  notFilled: {
    borderWidth: 1,
    borderColor: '#5460FE',
    borderStyle: 'solid',
  },
});

export default Button;
