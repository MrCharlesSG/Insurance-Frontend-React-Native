import { useNavigation } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, FormField } from "../../components";
import DatePickerField from "../../components/DatePickerField";
import { useGlobalContext } from "../../context/GlobalProvider";
import * as yup from 'yup';
import { Formik } from 'formik';

const CreateReport = () => {
  const navigation = useNavigation();
  const { setCreatingReport } = useGlobalContext();

  const validationSchema = yup.object().shape({
    date: yup.number().required('Date is required'),
    place: yup.string().required('Place is required'),
    details: yup.string().required('Details are required'),
  });


  const handleNext = (values) => {
    setCreatingReport(values);
      navigation.navigate('(report-create)/info-report-driver');
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-secondary font-psemibold">Create Report</Text>
        <Text className="text-2xl text-secondary-200 font-psemibold">Common Information</Text>
        
        <Formik
          initialValues={{
            date: Date.now(),
            place: "",
            details: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleNext}
        >
          {({ handleChange, resetForm, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <>
              <DatePickerField 
                title={"Date"}
                value={values.date}
                placeholder="When incident has happened"
                handleChange={(date) => setFieldValue('date', date)}
                otherStyles={"mt-5"}
                error={touched.date && errors.date}
              />
              
              <FormField 
                title={"Place"}
                value={values.place}
                placeholder={"Where incident has happened"}
                handleChangeText={handleChange('place')}
                onBlur={handleBlur('place')}
                otherStyles={"mt-5"}
                error={touched.place && errors.place}
              />

              <FormField 
                title={"Details"}
                value={values.details}
                placeholder={"What has happened"}
                handleChangeText={handleChange('details')}
                onBlur={handleBlur('details')}
                otherStyles={"mt-5"}
                numberOfLines={5} 
                multiline={true}
                error={touched.details && errors.details}
              />

              <View className="flex flex-row w-full mt-7">
                <CustomButton 
                  title={"Reset"}
                  containerStyles={"w-1/3 bg-white"}
                  textStyles={"text-exalted"}
                  handlePress={resetForm}
                />
                <View className="w-2" />
                <CustomButton 
                  title={"Next"}
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

export default CreateReport;
