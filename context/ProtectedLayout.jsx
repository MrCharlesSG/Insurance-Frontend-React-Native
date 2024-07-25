// context/ProtectedLayout.js
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useGlobalContext } from './GlobalProvider';

const ProtectedLayout = ({ children }) => {
  const { isLogged, loading } = useGlobalContext();

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!isLogged) {
    router.push('(auth)/sign-in');
    return null;
  }

  return children;
};

export default ProtectedLayout;
