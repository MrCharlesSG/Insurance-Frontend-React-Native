import React, { useState } from 'react';
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert } from "react-native";
import { Formik } from 'formik';
import * as yup from 'yup';
import { Logo, FormField, CustomButton } from '../../components';
import { signIn } from "../../lib/sb-auth";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const context = useGlobalContext();

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  const submit = async (values) => {
    setSubmitting(true);

    try {
      await signIn(values.username, values.password, context);
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
            Log in to Insurance App
          </Text>

          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={submit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
              <>
                <FormField
                  title="Username"
                  value={values.username}
                  handleChangeText={(text) => setFieldValue('username', text.replace(/\s/g, ''))}
                  onBlur={handleBlur('username')}
                  error={touched.username && errors.username}
                  otherStyles="mt-7"
                />
                <FormField
                  title="Password"
                  value={values.password}
                  handleChangeText={(text) => setFieldValue('password', text.replace(/\s/g, ''))}
                  onBlur={handleBlur('password')}
                  error={touched.password && errors.password}
                  otherStyles="mt-7"
                />
                <CustomButton
                  title="Sign In"
                  handlePress={handleSubmit}
                  containerStyles="mt-7"
                  isLoading={isSubmitting}
                />
              </>
            )}
          </Formik>

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignIn;
