import React, { useEffect, useState } from 'react';
import { AuthProvider } from './src/components/AuthProvider';
import Loader from './src/components/UI/Loader';
import Navigation from './src/navigation/Navigation';

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    window.onload = () => {
      setTimeout(() => {
        setInitialLoading(false);
      }, 2000);
    };

    // @ts-ignore
    window.onload();
  }, []);

  return initialLoading ? (
    <Loader />
  ) : (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
