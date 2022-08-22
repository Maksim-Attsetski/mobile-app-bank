import React, { FC } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { routeNames, TypeNavigation } from '../navigation/navTypes';

interface IProps {
  navigate: (screen: keyof TypeNavigation) => void;
  currentPath: any;
}

const Footer: FC<IProps> = ({ navigate, currentPath }) => {
  return (
    <View style={styles.links}>
      {routeNames.map(link => (
        <Pressable onPress={() => navigate(link.name)} key={link.name}>
          <Text style={currentPath === link ? { ...styles.link, ...styles.activeLink } : { ...styles.link }}>
            {link.text}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  links: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  link: {
    borderWidth: 1,
    borderColor: '#5460FE',
    borderStyle: 'solid',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 7,
    fontSize: 18,
    marginHorizontal: 7,
  },
  activeLink: {
    borderColor: 'transparent',
    backgroundColor: '#5460FE',
    color: '#fff',
  },
});

export default Footer;
