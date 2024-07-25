import React from 'react';
import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert } from "react-native";
import { Formik } from 'formik';
import * as yup from 'yup';
import { Logo, FormField, CustomButton } from '../../components';
import { signUpVehicle } from "../../lib/sb-auth";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const context = useGlobalContext();

  const validationSchema = yup.object().shape({
    plate: yup.string().required('Plate is required'),
    model: yup.string().required('Model is required'),
    brand: yup.string().required('Brand is required'),
    year: yup.number().required('Year is required').min(1900, 'Year must be 1900 or later').max(new Date().getFullYear(), `Year must be ${new Date().getFullYear()} or earlier`),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  });

  const submit = async (values) => {
    setSubmitting(true);

    try {
      const signUpVehicleData = {
        username: values.plate,
        password: values.password,
        matchingPassword: values.password,
        vehicle: {
          plate: values.plate,
          model: values.model,
          brand: values.brand,
          manufacturingYear: values.year
        }
      };

      await signUpVehicle(signUpVehicleData, context);
      router.replace("/reports");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Logo />

          <Text className="text-2xl font-semibold text-gray-100 mt-10 font-psemibold">
            Sign Up to Insurance App
          </Text>

          <Formik
            initialValues={{
              plate: '',
              model: '',
              brand: '',
              year: '',
              password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={submit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <FormField
                  title="Plate"
                  value={values.plate}
                  handleChangeText={handleChange('plate')}
                  onBlur={handleBlur('plate')}
                  error={touched.plate && errors.plate}
                  otherStyles="mt-10"
                />
                <FormField
                  title="Brand"
                  value={values.brand}
                  handleChangeText={handleChange('brand')}
                  onBlur={handleBlur('brand')}
                  error={touched.brand && errors.brand}
                  otherStyles="mt-7"
                />
                <FormField
                  title="Model"
                  value={values.model}
                  handleChangeText={handleChange('model')}
                  onBlur={handleBlur('model')}
                  error={touched.model && errors.model}
                  otherStyles="mt-7"
                />
                <FormField
                  title="Manufacturing Year"
                  value={values.year}
                  handleChangeText={handleChange('year')}
                  onBlur={handleBlur('year')}
                  keyboardType="numeric"
                  error={touched.year && errors.year}
                  otherStyles="mt-7"
                />
                <FormField
                  title="Password"
                  value={values.password}
                  handleChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password && errors.password}
                  otherStyles="mt-7"
                />
                <CustomButton
                  title="Sign Up"
                  handlePress={handleSubmit}
                  containerStyles="mt-7"
                  isLoading={isSubmitting}
                />
              </>
            )}
          </Formik>

          <View className="flex justify-center pt-5 flex-row gap-2 mb-5">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUp;
