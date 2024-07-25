import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "../constants";

import { getMyInfoReport, getOtherInfoReport } from '../utils/report-utils';
import { formatDate, getStatusColor } from '../utils/string-utils';
import FormFieldText from './FormFieldText';
import InfoReportDetails from './InfoReportDetails';
import HeaderWithBack from './HeaderWithBack';

const ReportSummary = ({
    report, endForm, handleBack, context, showMyInfoInit
}) => {

  const [showMyInfo, setShowMyInfo] = useState(showMyInfoInit);
  const [showOtherInfo, setShowOtherInfo] = useState(true);
  
  const otherInfo = getOtherInfoReport(report, context);
  const myInfo = getMyInfoReport(report, context);
  return (
    <SafeAreaView className="bg-primary h-full flex flex-col">
   <HeaderWithBack 
    handleBack={handleBack}
    title={
      <>
        {`Report on\n`} <Text className=" text-secondary-100">{formatDate(report.date)}</Text>
      </>
    }
   />
      <ScrollView>
        <View
          className="w-full flex justify-center h-full"

        >
          <View className="px-4">

          

          <Text className=" mt-4 -mb-4 w-full text-base text-gray-100 font-pmedium">Status: <Text style={{color: getStatusColor(report.infoReportDriverB.status)}}>{report.infoReportDriverB.status}</Text></Text>


          <FormFieldText
            title="Place"
            value={report.place}
            otherStyles="mt-7"
          />

          <FormFieldText
            title="Details"
            value={report.details}
            otherStyles="mt-7"
          />
          <Text className="mt-8 mb-2 text-base text-gray-100 font-pmedium">Drivers Involved</Text>

          <InfoReportDetails 
            title={"My Info"}
            infoReportDetails={myInfo}
            show={showMyInfo}
            setShow={setShowMyInfo}
          />

          
          <InfoReportDetails 
            title={"Other Info"}
            infoReportDetails={otherInfo}
            show={showOtherInfo}
            setShow={setShowOtherInfo}
          />
          </View>

                 
        </View>
      </ScrollView>
      <>
            {endForm}
        </>
    </SafeAreaView>
  )
}

export default ReportSummary