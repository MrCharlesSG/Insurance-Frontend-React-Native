import { View, Text, SafeAreaView, ActivityIndicator, FlatList, Alert, RefreshControl } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getVehicleByPlate } from '../../lib/sb-vehicle';
import { useGlobalContext } from '../../context/GlobalProvider';
import FormFieldText from '../../components/FormFieldText';
import HeaderWithBack from '../../components/HeaderWithBack';
import { router, useNavigation } from 'expo-router';
import { dissociateDriverByEmail, getDriversByVehicle } from '../../lib/sb-drivers';
import ExtendedDriverCard from '../../components/ExtendedDriverCard';
import { CustomButton } from '../../components';
import useSpringBackend from '../../lib/useSpringBackend';

const Drivers = () => {
  const context = useGlobalContext();
  const navigation = useNavigation();
  const { user } = context;
  const [loadingList, setLoadingList] = useState(false);
  const [loadingDissociate, setLoadingDissociate] = useState(false);
  const [selectedDrivers, setSelectedDrivers] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const { data: drivers, refetch } = useSpringBackend(() => getDriversByVehicle(context, user));

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [])
  );

  const handleBack = () => {
    router.back();
  };

  const handleDissociate = () => {
    const selectedDriverNames = Object.values(selectedDrivers)
      .filter(driver => driver.isSelected)
      .map(driver => `${driver.name} ${driver.surname}`)
      .join(',\n ');

    Alert.alert(
      'Confirm Dissociation',
      `Are you sure you want to dissociate the following drivers:\n ${selectedDriverNames}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => dissasociateDrivers()
        }
      ]
    );
  };

  const dissasociateDrivers = async () => {
    try {
      console.log("Starting dissociate");
      setLoadingDissociate(true);

      const driversArray = Object.values(selectedDrivers);
      for (const driver of driversArray) {
        if (driver.isSelected) {
          console.log("Dissociate " + JSON.stringify(driver));
          await dissociateDriverByEmail(context, driver.email);
        }
      }

      setLoadingDissociate(false);
      onRefresh();
    } catch (error) {
      Alert.alert("Error dissociating driver", error.message)
    }
  };

  const handleAssociate = () => {
    navigation.navigate("(profile)/associate-driver");
  };

  const handleOnPressDriver = (driver) => {
    setSelectedDrivers(prevSelectedDrivers => ({
      ...prevSelectedDrivers,
      [driver.id]: {
        isSelected: !prevSelectedDrivers[driver.id]?.isSelected,
        name: driver.name,
        surname: driver.surnames,
        email: driver.email
      }
    }));
  };

  return (
    <SafeAreaView className="bg-primary h-full flex flex-col ">
      <View className="mt-10">
        <HeaderWithBack
          handleBack={handleBack}
          title={"Drivers"}
        />
      </View>
      <View className="p-4 flex-1">
        {loadingList ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {drivers.length > 0 ? (
              <FlatList
                data={drivers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <ExtendedDriverCard 
                    driver={item}
                    isSelected={!!selectedDrivers[item.id]?.isSelected}
                    onPress={() => handleOnPressDriver(item)}
                    selectedColor={"#f43f5e"}
                  />
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
                refreshControl={
                  <RefreshControl refreshing={refreshing} tintColor="#6366f1" onRefresh={onRefresh} />
                }
              />
            ) : (
              <Text className="text-lg text-center mb-4">No drivers for this vehicle</Text>
            )}
          </>
        )}
      </View>
      <View className="flex flex-row w-full my-2 px-4">
        <CustomButton 
          title={"Dissociate"}
          containerStyles={"w-1/3 bg-white"}
          textStyles={"text-red"}
          isLoading={loadingDissociate}
          handlePress={handleDissociate}
        />
        <View className="w-2" />
        <CustomButton 
          title={"Associate"}
          containerStyles={"flex-1"}
          handlePress={handleAssociate}
        />
      </View>
    </SafeAreaView>
  );
};

export default Drivers;
