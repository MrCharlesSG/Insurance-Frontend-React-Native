import { View, Text, SafeAreaView, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import HeaderWithBack from '../../components/HeaderWithBack';
import { FormField } from '../../components';
import SearchInput from "../../components/SearchInput";
import { router, useNavigation } from 'expo-router';
import DatePickerField from "../../components/DatePickerField";
import { useGlobalContext } from '../../context/GlobalProvider';
import CustomButton from '../../components/CustomButton';
import { associateDriverByEmail, createDriver, getDriversByEmail } from '../../lib/sb-drivers';
import prompt from 'react-native-prompt-android';
import FormFieldTitle from '../../components/FormFieldTitle';
import dayjs from 'dayjs';

const AssociateDriver = () => {
  const navigation = useNavigation();
  const context = useGlobalContext();

  const initialFormState = {
    name: "",
    surnames: "",
    passport: "",
    email: "",
    date: dayjs().toDate(),
    id: -1,
  };

  const [form, setForm] = useState(initialFormState);
  const [dialogEmail, setDialogEmail] = useState("");
  const [onExistingLoading, setOnExistingLoading] = useState(false);
  const [onAssociateLoading, setOnAssociateLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleExisting = () => {
    setOnExistingLoading(true);
    prompt(
      'Enter Email',
      'Please enter the email of the driver:',
      [
        {
          text: 'Cancel',
          onPress: () => setOnExistingLoading(false),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: (email) => handleEmailSubmission(email),
        },
      ],
      {
        type: 'email-address',
        cancelable: false,
        defaultValue: '',
        placeholder: 'example@example.com'
      }
    );
  };

  const handleEmailSubmission = async (email) => {
    try {
      const driver = await getDriversByEmail(context, email);
      console.log(JSON.stringify(driver));
      setForm({
        ...driver,
        date: dayjs(driver.birthday).toDate(),
      });
    } catch (error) {
      Alert.alert("Wrong Email", "Driver with " + email + " as email does not exist");
    } finally {
      setOnExistingLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialFormState);
  };

  const handleAssociate = async () => {
    try {
      setOnAssociateLoading(true);
      if (form.id === -1) {
        await createDriver(context, form);
      }
      await associateDriverByEmail(context, form.email);
      navigation.navigate("(profile)/drivers");
    } catch (error) {
      Alert.alert("Error Associating", error.message);
    } finally {
      setOnAssociateLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full flex flex-col">
      <View className="mt-10">
        <HeaderWithBack
          handleBack={handleBack}
          title={"Associate Driver"}
        />
      </View>
      <ScrollView className="p-4">
        <FormField
          title={"Name"}
          value={form.name}
          placeholder={"Name of driver"}
          handleChangeText={(e) => setForm({ ...form, id: -1, name: e })}
          otherStyles={"mt-3"}
        />
        <FormField
          title={"Surnames"}
          value={form.surnames}
          placeholder={"Lastname and surnames of driver"}
          handleChangeText={(e) => setForm({ ...form, id: -1, surnames: e })}
          otherStyles={"mt-3"}
        />
        <FormField
          title={"Passport"}
          placeholder={"Passport or ID of driver"}
          value={form.passport}
          handleChangeText={(e) => setForm({ ...form, id: -1, passport: e })}
          otherStyles={"mt-3"}
        />
        <FormFieldTitle 
          title={"Email"}
          otherStyles={"mt-3 mb-2"}
        />
        <SearchInput
          initialValue={form.email}
          setValue={(e) => setForm({ ...form, id: -1, email: e })}
          placeholder={"In existing press search"}
          onPress={(query) => handleEmailSubmission(query)}
          keyboardType={"email-addressasasd"}
        />
        <DatePickerField
          title={"Birthday"}
          value={form.date}
          handleChange={(e) => setForm({ ...form, id: -1, date: e })}
          otherStyles={"mt-3"}
        />
      </ScrollView>
      <View className="flex flex-row w-full my-2 px-4">
        <CustomButton
          title={"Reset"}
          containerStyles={"flex-1 bg-white"}
          handlePress={handleReset}
          textStyles={"text-exalted"}
        />
        <View className="w-2" />
        <CustomButton
          title={"Associate"}
          isLoading={onAssociateLoading}
          containerStyles={"flex-1"}
          handlePress={handleAssociate}
        />
      </View>
    </SafeAreaView>
  );
};

export default AssociateDriver;
