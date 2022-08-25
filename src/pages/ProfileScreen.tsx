import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Layout from '../components/Layout';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Line from '../components/UI/Line';
import Loader from '../components/UI/Loader';
import { useAuth } from '../hooks/useAuth';
import useProfile from '../hooks/useProfile';

const ProfileScreen: FC = () => {
  const { navigate } = useNavigation();
  const { handleLogout } = useAuth();
  const { profile, profileIsLoading, changeProfile } = useProfile();
  const [name, setName] = useState<string>('');

  const onPressLogout = () => {
    // @ts-ignore
    navigate('Auth');
    handleLogout();
  };

  return profileIsLoading || !profile ? (
    <Loader />
  ) : (
    <Layout>
      <View style={styles.flex}>
        <Text style={{ ...styles.item, textTransform: 'capitalize' }}>{profile.displayName}</Text>
        <Text style={styles.item}>{profile.email}</Text>
      </View>
      <Line />
      <Input
        value={name}
        onChangeText={(value: string) => setName(value)}
        placeholder={'Измените ваше имя'}
        defaultValue={profile.displayName}
      />

      <Button style={{ marginTop: 10, alignSelf: 'flex-end' }} onPress={() => changeProfile(name)}>
        Сохранить имя
      </Button>

      <Line />
      <Button onPress={onPressLogout} style={{ alignSelf: 'flex-start' }} filled>
        Выйти
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  item: {
    backgroundColor: '#5460FE',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    textAlign: 'center',
    color: '#fff',
  },
});
export default ProfileScreen;
