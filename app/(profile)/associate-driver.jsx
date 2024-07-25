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
import dayjs from 'dayjs';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormFieldTitle from '../../components/FormFieldTitle';

const AssociateDriver = () => {
  const navigation = useNavigation();
  const context = useGlobalContext();
  const [onAssociateLoading, setOnAssociateLoading] = useState(false);
  const [onSearching, setOnSearching] = useState(false);

  const initialFormState = {
    name: "",
    surnames: "",
    passport: "",
    email: "",
    date: dayjs().toDate(),
    id: -1,
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    surnames: yup.string().required('Surnames are required'),
    passport: yup.string().required('Passport is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    date: yup.date().required('Date is required'),
  });

  const handleEmailSubmission = async (email, setFieldValue) => {
    setOnSearching(true)
    try {
      const driver = await getDriversByEmail(context, email);
      setFieldValue('name', driver.name);
      setFieldValue('surnames', driver.surnames);
      setFieldValue('passport', driver.passport);
      setFieldValue('email', driver.email);
      setFieldValue('date', dayjs(driver.birthday).toDate());
      setFieldValue('id', driver.id);
    } catch (error) {
      Alert.alert("Wrong Email", "Driver with " + email + " as email does not exist");
    }finally{
      setOnSearching(false)
    }
  };

  const handleAssociate = async (values, resetForm) => {
    setOnAssociateLoading(true)
    try {
      if (values.id === -1) {
        await createDriver(context, values);
      }
      await associateDriverByEmail(context, values.email);
      navigation.navigate("(profile)/drivers");
    } catch (error) {
      Alert.alert("Error Associating", error.message);
    }finally{
      setOnAssociateLoading(false)
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full flex flex-col">
      <View className="mt-10">
        <HeaderWithBack handleBack={() => router.back()} title={"Associate Driver"} />
      </View>
      <ScrollView className="p-4">
        <Formik
          initialValues={initialFormState}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => handleAssociate(values, resetForm)}
        >
          {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched, resetForm }) => (
            <>
              <FormField
                title={"Name"}
                value={values.name}
                placeholder={"Name of driver"}
                handleChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                error={touched.name && errors.name}
                otherStyles={"mt-3"}
              />
              <FormField
                title={"Surnames"}
                value={values.surnames}
                placeholder={"Lastname and surnames of driver"}
                handleChangeText={handleChange('surnames')}
                onBlur={handleBlur('surnames')}
                error={touched.surnames && errors.surnames}
                otherStyles={"mt-3"}
              />
              <FormField
                title={"Passport"}
                value={values.passport}
                placeholder={"Passport or ID of driver"}
                handleChangeText={handleChange('passport')}
                onBlur={handleBlur('passport')}
                error={touched.passport && errors.passport}
                otherStyles={"mt-3"}
              />
              <FormFieldTitle title={"Email"} otherStyles={"mt-3 mb-2"} />
              <SearchInput
                initialValue={values.email}
                setValue={email => setFieldValue('email', email)}
                placeholder={"In existing press search"}
                onPress={email => handleEmailSubmission(email, setFieldValue)}
                keyboardType={"email-address"}
                error={touched.email && errors.email}
                loading={onSearching}
              />
              <DatePickerField
                title={"Birthday"}
                value={values.date}
                handleChange={date => setFieldValue('date', date)}
                error={touched.date && errors.date}
                otherStyles={"mt-3"}
              />
              <View className="flex flex-row w-full my-2 px-4">
                <CustomButton
                  title={"Reset"}
                  containerStyles={"flex-1 bg-white"}
                  handlePress={resetForm}
                  textStyles={"text-exalted"}
                />
                <View className="w-2" />
                <CustomButton
                  title={"Associate"}
                  isLoading={onAssociateLoading}
                  containerStyles={"flex-1"}
                  handlePress={handleSubmit}
                />
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AssociateDriver;
