import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Layout from '../components/Layout';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Line from '../components/UI/Line';
import { useAuth } from '../hooks/useAuth';
import { TypeNavigation } from '../navigation/navTypes';

interface IFormItems {
  email: string;
  password: string;
}

const AuthScreen = ({ navigation }: any) => {
  const { handleRegister, handleLogin } = useAuth();
  const { navigate } = useNavigation();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formItems, setFormItems] = useState<IFormItems>({} as IFormItems);

  const handleAuth = () => {
    const { email, password } = formItems;

    // @ts-ignore
    navigate('Home');
    isLogin ? handleLogin(email, password) : handleRegister(email, password);
  };

  return (
    <Layout>
      <Button style={{ alignSelf: 'flex-end' }} onPress={() => setIsLogin(prev => !prev)}>
        {isLogin ? 'Нет аккаунта?' : 'Есть аккаунт?'}
      </Button>

      <Line />
      <Input
        value={formItems.email}
        onChangeText={(value: string) => setFormItems({ ...formItems, email: value })}
        placeholder={'Email'}
      />
      <Line />

      <Input
        value={formItems.password}
        onChangeText={(value: string) => setFormItems({ ...formItems, password: value })}
        placeholder={'Пароль'}
        isSecure
      />
      <Line />
      <Button onPress={handleAuth}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
    </Layout>
  );
};
export default AuthScreen;
