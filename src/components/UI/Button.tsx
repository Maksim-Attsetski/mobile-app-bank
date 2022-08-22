import React, { FC, ReactNode } from 'react';
import { Pressable, StyleProp, StyleSheet, Text } from 'react-native';

interface IProps {
  children: ReactNode;
  onPress: (arg?: any) => void;
  style?: StyleProp<any>;
}

const Button: FC<IProps> = ({ children, onPress, style, ...props }) => {
  return (
    <Pressable onPress={onPress} style={{ ...styles.link, ...style }} {...props}>
      <Text>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  link: {
    borderWidth: 1,
    borderColor: '#5460FE',
    borderStyle: 'solid',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 7,
    fontSize: 18,
    marginHorizontal: 7,
    alignSelf: 'flex-end',
  },
});

export default Button;
