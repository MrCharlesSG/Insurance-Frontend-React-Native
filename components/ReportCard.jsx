import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { formatDate, getDriveName, getStatusColor } from '../utils/string-utils'
import { router } from 'expo-router'
import {getMyInfoReport} from '../utils/report-utils'



const ReportCard = ({report, context}) => {

  const handleOnPress = () => {
    const reportToString = JSON.stringify(report)
    console.log(reportToString)
    router.push(`/report-details/${reportToString}`)
  }

  const getDriverNameFromReport = () => {
    const infoReport = getMyInfoReport(report, context)
    return getDriveName(infoReport.driver)
  }


  return (
    <TouchableOpacity
      onPress={handleOnPress}
      className=" justify-between flex-row bg-white border-2 border-slate-50 mx-4 rounded-xl mt-2">
      <View className ="p-2">
        <Text className=" font-psemibold text-lg ">{formatDate(report.date)}</Text>
        <Text className=" font-pregular">{report.place}</Text>
        <Text className=" font-pregular">{getDriverNameFromReport()}</Text>
      </View>
      <View className="w-1 rounded-r-xl" style={{backgroundColor: getStatusColor(report.infoReportDriverB.status)}} />
    </TouchableOpacity>
  )
}

export default ReportCard