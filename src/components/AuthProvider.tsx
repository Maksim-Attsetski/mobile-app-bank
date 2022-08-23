import { onAuthStateChanged, updateProfile, User } from 'firebase/auth';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { createContext, FC, ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { firebaseAuth, fs, login, logout, register } from '../firebase/firebase';

interface IContext {
  user: User | null;
  isLoading: boolean;
  handleRegister: (email: string, password: string) => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: FC = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async (email: string, password: string) => {
    setIsLoading(false);
    try {
      const { user: data } = await register(email, password);

      addDoc(collection(fs, 'users'), {
        uid: data.uid,
        displayName: 'Без имени',
        email,
      });

      updateProfile(data, {
        displayName: 'Без имени',
      });
    } catch (error: any) {
      console.log('Ошибка', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(false);
    try {
      await login(email, password);
    } catch (error: any) {
      console.log('Ошибка', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(false);
    try {
      await logout();
    } catch (error: any) {
      console.log('Ошибка', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => onAuthStateChanged(firebaseAuth, user => setUser(user || null)), []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      handleRegister,
      handleLogin,
      handleLogout,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
