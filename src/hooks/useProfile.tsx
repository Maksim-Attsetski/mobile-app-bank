import { updateProfile } from 'firebase/auth';
import { collection, doc, limit, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { fs } from '../firebase/firebase';
import { IProfile } from '../types/profile';
import { useAuth } from './useAuth';

const useProfile = () => {
  const { user } = useAuth();
  const [profileIsLoading, setProfileIsLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<IProfile | null>(null);

  const changeProfile = async (displayName: string, photoURL: string = '') => {
    if (!user || !profile) return Alert.alert('Сообщение', 'Пользователя нет');
    setProfileIsLoading(true);
    try {
      await updateProfile(user, {
        displayName,
        photoURL,
      });

      const docRef = doc(fs, 'users', profile.docId);

      await updateDoc(docRef, {
        displayName,
        photoURL,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setProfileIsLoading(false);
    }
  };

  useEffect(() => {
    setProfileIsLoading(true);

    onSnapshot(query(collection(fs, 'users'), where('uid', '==', user?.uid), limit(1)), snapshot => {
      const profile: IProfile = snapshot.docs.map(doc => ({
        ...(doc.data() as IProfile),
        docId: doc.id,
      }))[0];
      setProfile(profile);
    });

    setProfileIsLoading(false);
  }, []);

  return {
    profile,
    profileIsLoading,
    changeProfile,
  };
};
export default useProfile;
