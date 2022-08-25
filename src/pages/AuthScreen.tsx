import { useNavigation } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Line from '../components/UI/Line';
import Title from '../components/UI/Title';
import { useAuth } from '../hooks/useAuth';

interface IFormItems {
  email: string;
  password: string;
}

const AuthScreen: FC = () => {
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
      <Title text={'Авторизуйтесь'} style={{ marginBottom: 30 }} />

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
      <Button onPress={handleAuth} style={{ alignSelf: 'flex-start' }} filled>
        {isLogin ? 'Войти' : 'Зарегистрироваться'}
      </Button>
      <Button style={{ alignSelf: 'flex-end', marginTop: 10 }} onPress={() => setIsLogin(prev => !prev)}>
        {isLogin ? 'Нет аккаунта?' : 'Есть аккаунт?'}
      </Button>
    </Layout>
  );
};
export default AuthScreen;
