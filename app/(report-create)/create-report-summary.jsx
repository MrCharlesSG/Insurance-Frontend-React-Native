import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { useNavigation } from 'expo-router';
import ReportSummary from '../../components/ReportSummary';
import { CustomButton } from '../../components';
import { openReport } from '../../lib/sb-reports';
import ProgressBar from '../../components/ProgressBar';
import { TOTAL_STEPS_CREATING_REPORT } from '../../constants/values';

const CreateReportSummary = () => {
    
  const context = useGlobalContext();
  const navigation = useNavigation();
  const {creatingReport} = context
  const [finishLoading, setFinishLoading] = useState(false)

  const handleBack=() => {
    navigation.navigate('(report-create)/info-report-driver');
  }

  const handleAccept = async () => {
    setFinishLoading(true)
    const newReport = {
        details: creatingReport.details,
        place: creatingReport.place,
        date: creatingReport.date,
        driverAId: creatingReport.infoReportDriverA.driver.id,
        damages: creatingReport.infoReportDriverA.damages,
        driverBId: creatingReport.infoReportDriverB.driver.id,
        vehicleB: creatingReport.infoReportDriverB.vehicle.plate,
    }
    console.log("THIS IS OPEN REPORT "+JSON.stringify(newReport))
    const report = await openReport(context, newReport)
    setFinishLoading(false)
    navigation.navigate("reports");
  }

  const handleCancel = () => {
    navigation.navigate("reports");
  }

  return (
    <View className="h-full">
      <ReportSummary 
        report={creatingReport}
        handleBack={handleBack}
        context={context}
        showMyInfoInit={true}
        endForm={
            <>
              <View className=" flex flex-row w-full my-2 px-4">
          <CustomButton 
            title={"Cancel"}
            containerStyles={"w-1/3 bg-white "}
            textStyles={" text-red"}
            handlePress={handleCancel}
          />
          <View className="w-2" />
          <CustomButton 
            title={"Finish"}
            isLoading={finishLoading}
            containerStyles={"flex-1"}
            handlePress={handleAccept}
          />
        </View>
        <ProgressBar
          step={TOTAL_STEPS_CREATING_REPORT}
          total={TOTAL_STEPS_CREATING_REPORT+1}
        />
            </>
        }
    />
    </View>
  )
}

export default CreateReportSummary