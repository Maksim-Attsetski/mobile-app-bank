import React, { FC, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { TypeNavigation } from '../navigation/navTypes';

interface IProps {
  navigate: (screen: keyof TypeNavigation) => void;
  currentPath: any;
}

const Footer: FC<IProps> = ({ navigate, currentPath }) => {
  const { user } = useAuth();

  const footerLinks: { name: keyof TypeNavigation; text: string }[] = useMemo(
    () => [
      { name: 'News', text: 'Новости' },
      { name: 'Home', text: 'Главная' },
      { name: 'Exchanges', text: 'Банки' },
      { name: user ? 'Profile' : 'Auth', text: user ? 'Профиль' : 'Вход' },
    ],
    [user]
  );

  return (
    <View style={styles.links}>
      {footerLinks.map(link => (
        <Pressable onPress={() => navigate(link.name)} key={link.name}>
          <Text style={currentPath === link.name ? { ...styles.link, ...styles.activeLink } : { ...styles.link }}>
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
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 18,
    marginHorizontal: 4,
  },
  activeLink: {
    borderColor: 'transparent',
    backgroundColor: '#5460FE',
    color: '#fff',
  },
});

export default Footer;
