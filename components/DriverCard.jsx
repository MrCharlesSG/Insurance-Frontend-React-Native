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
      className={`justify-between items-center flex-row bg-white border-2 ${isSelected? " border-secondary-50 bg-indigo-50":" border-slate-50"} rounded-xl mt-2 mr-1 `}>
      <View className ="p-2">
        <Text className=" font-psemibold text-lg ">{getDriveName(driver)}</Text>
        
      </View>
    </TouchableOpacity>
  )
}

export default DriverCard