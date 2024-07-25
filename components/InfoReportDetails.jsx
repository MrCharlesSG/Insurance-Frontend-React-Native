import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, Text, Alert, TouchableWithoutFeedback } from "react-native";

import { icons } from "../constants";
import { getDriveName, getStatusColor } from "../utils/string-utils";
import { TouchableHighlight } from "react-native-gesture-handler";

const InfoReportDetails = ({infoReportDetails, show, setShow, title}) => {
  return (
    <View>
      <TouchableOpacity
      onPress={() => {
         setShow(!show)
        }}
        className="flex flex-col items-center space-x-4 w-full h-fit px-4 bg-white rounded-2xl border-2 border-slate-50 focus:border-secondary"
        
        >

        <View className="flex flex-row items-center py-4">
        <Text
        className="text-base mt-0.5 flex-1 font-pregular"
      >{title}</Text>

        <Image source={icons.angular} tintColor="#4f46e5" className={`w-5 h-5 ${show? 'rotate-90':''}`} resizeMode="contain" />
       
        </View>
     {
        show &&
        <View className=" w-full">
            <Text className="font-pregular text-md">Vehicle: <Text className ="font-psemibold text-lg text-secondary">{infoReportDetails.vehicle.plate}</Text></Text>
            <Text className="font-pregular text-md">Brand:    <Text className ="font-psemibold text-lg text-secondary">{infoReportDetails.vehicle.brand}</Text></Text>

            <Text className="font-pregular text-md">Model:    <Text className ="font-psemibold text-lg text-secondary">{infoReportDetails.vehicle.model}</Text></Text>
            <Text className="font-pregular text-md">Driver:    <Text className ="font-psemibold text-lg text-secondary">{getDriveName(infoReportDetails.driver)}</Text></Text>
            
            <Text className=" font-pregular text-md">Status:    <Text className="font-psemibold text-lg" style={{color: getStatusColor(infoReportDetails.status)}}>{infoReportDetails.status}</Text></Text>
            <Text className="font-pregular text-md">Damages: <Text className ="font-psemibold text-lg text-secondary">{infoReportDetails.damages}</Text></Text>

            
        </View>
    }
    </TouchableOpacity>
    
    </View>
  )
}

export default InfoReportDetails