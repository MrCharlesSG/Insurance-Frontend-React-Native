import React from 'react';
import { View } from 'react-native';
import { Redirect } from 'expo-router';
import { useGlobalContext } from './GlobalProvider';

const ProtectedLayout = ({ children }) => {
  const { loading, isLogged } = useGlobalContext();

  if (loading) return null; // Puedes mostrar un spinner aquí si lo prefieres

  if (!isLogged) {
    return <Redirect href="/sign-in" />;
  }

  return <View style={{ flex: 1 }}>{children}</View>;
};

export default ProtectedLayout;
