import React, { useEffect, useState } from 'react'
import {  router, useLocalSearchParams, useNavigation } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";

import { icons } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { formatDate, getStatusColor } from '../../utils/string-utils';
import InfoReportDetails from '../../components/InfoReportDetails';
import { getMyInfoReport, getOtherInfoReport } from '../../utils/report-utils';
import useSpringBackend from '../../lib/useSpringBackend';
import { acceptReport, rejectReports } from '../../lib/sb-reports';
import FormFieldText from '../../components/FormFieldText';
import ReportSummary from '../../components/ReportSummary';

const Report = () => {
  const context = useGlobalContext();
  const navigation = useNavigation();
  const { report } = useLocalSearchParams();
  const [reportJSON, setReportJSON] = useState(JSON.parse(report));
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [damages, setDamages] = useState("");

  useEffect(() => {
      setReportJSON(JSON.parse(report));
  }, [report]);

  const handleBack = () => {
      navigation.goBack();
  };

  const handleAccept = async () => {
      if (damages === "") {
          Alert.alert("Damages Empty", "Damages must not be empty. If you don't have damages you can put nothing");
          return;
      }
        setAcceptLoading(true);
      try {
        await acceptReport(context, reportJSON.id, damages);
  
        navigation.navigate("reports");
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setAcceptLoading(false);
      }
     
  };

  const handleReject = async () => {
    setRejectLoading(true);
    try {
      await rejectReports(context, reportJSON.id);

      navigation.navigate("reports");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setRejectLoading(false);
    }
  };

  const myInfo = getMyInfoReport(reportJSON, context);

  return (
    <ReportSummary 
      report={reportJSON}
      handleBack={handleBack}
      context={context}
      showMyInfoInit={false}
      endForm={
            myInfo.status==="WAITING" &&
            <View className=" px-4">
            <FormField
                title="Your Vehicle Damages"
                value={damages}
                handleChangeText={(e) => setDamages(e)}
                otherStyles="mt-7"
                placeholder={"Only neccessary in accept"}
              />
              <View className="flex flex-row w-full items-center space-x-2 mt-8 mb-3">
              
                <CustomButton
                  title={"Reject"}
                  containerStyles={" bg-rose-500 flex-1"}
                  isLoading={rejectLoading}
                  handlePress={handleReject}
                />
                <View className="w-2" />
                <CustomButton
                  title={"Accept"}
                  isLoading={acceptLoading}
                  containerStyles={" bg-emerald-500 w-1/2 flex-1"}
                  handlePress={handleAccept}
                />
              </View>
            </View>
          }
    />
  )
}

export default Report