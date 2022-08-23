import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import NewsScreen from '../pages/NewsScreen';
import HomeScreen from '../pages/HomeScreen';
import ExchangesScreen from '../pages/ExchangesScreen';
import CreditItemScreen from '../pages/CreditItemScreen';
import BankBranchScreen from '../pages/BankBranchScreen';
import AllBankBranchesScreen from '../pages/AllBankBranchesScreen';
import AuthScreen from '../pages/AuthScreen';
import ProfileScreen from '../pages/ProfileScreen';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  const containerRef = useNavigationContainerRef();
  const [path, setPath] = useState<string | undefined>(undefined);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPath(containerRef.getCurrentRoute()?.name);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const listener = containerRef.addListener('state', () => {
      setPath(containerRef.getCurrentRoute()?.name);
    });

    return () => containerRef.removeListener('state', listener);
  }, []);

  return (
    <>
      <NavigationContainer ref={containerRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Exchanges' component={ExchangesScreen} />
          <Stack.Screen name='Credit' component={CreditItemScreen} />
          <Stack.Screen name='News' component={NewsScreen} />
          <Stack.Screen name='BankBranch' component={BankBranchScreen} />
          <Stack.Screen name='AllBankBranches' component={AllBankBranchesScreen} />
          <Stack.Screen name='Auth' component={AuthScreen} />
          <Stack.Screen name='Profile' component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Footer navigate={containerRef.navigate} currentPath={path} />
    </>
  );
};
export default Navigation;
