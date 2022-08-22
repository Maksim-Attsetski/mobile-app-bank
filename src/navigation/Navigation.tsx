import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import NewsScreen from '../pages/NewsScreen';
import HomeScreen from '../pages/HomeScreen';
import ExchangesScreen from '../pages/ExchangesScreen';

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
          <Stack.Screen name='News' component={NewsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Footer navigate={containerRef.navigate} currentPath={path} />
    </>
  );
};
export default Navigation;
