import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { getDriveName } from '../utils/string-utils'

const DriverCard = ({driver, onPress, isSelected}) => {

    const getStatusColor = () => {
        if(isSelected){
            return "#6366f1"
        }
        return "#ffffff"
    }

  return (
    <TouchableOpacity
        onPress={onPress}
      className=" justify-between flex-row bg-white border-2 border-slate-50 rounded-xl mt-2">
      <View className ="p-2">
        <Text className=" font-psemibold text-lg ">{getDriveName(driver)}</Text>
        
      </View>
      <View className="w-1 rounded-r-xl" style={{backgroundColor: getStatusColor()}} />
    </TouchableOpacity>
  )
}

export default DriverCard