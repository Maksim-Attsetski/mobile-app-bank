import React, { FC, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { TypeNavigation } from '../navigation/navTypes';
import Line from './UI/Line';

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
    <View style={styles.footer}>
      <View style={styles.links}>
        {/* <View style={styles.leftBrace} />
      <View style={styles.rightBrace} /> */}
        {footerLinks.map(link => {
          const isActive = currentPath === link.name && { ...styles.active };
          return (
            <Pressable onPress={() => navigate(link.name)} key={link.name} style={styles.link}>
              <Text style={{ ...styles.border, ...isActive }} />
              <Text style={currentPath === link.name && { ...styles.activeText }}>{link.text}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: Dimensions.get('window').width,
    // backgroundColor: '#accbee',
  },
  links: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    position: 'relative',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  // leftBrace: {
  //   position: 'absolute',
  //   top: -20,
  //   left: 0,
  //   width: 20,
  //   height: 20,
  //   borderTopRightRadius: 20,
  //   backgroundColor: '#accbee',
  // },
  // rightBrace: {
  //   position: 'absolute',
  //   top: 0,
  //   right: 0,
  //   width: 20,
  //   height: 20,
  //   // borderTopRightRadius: 20,
  //   // backgroundColor: '#e7f0fd',
  // },
  border: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 5,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  active: {
    backgroundColor: '#5460fe',
  },
  activeText: {
    color: '#353434',
  },
  link: {
    position: 'relative',
    borderWidth: 5,
    borderColor: 'transparent',
    borderStyle: 'solid',
    paddingVertical: 20,
    fontSize: 16,
    marginHorizontal: 4,
  },
});

export default Footer;
