import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { formatDate, getDriveName } from '../utils/string-utils'

const ExtendedDriverCard = ({driver, onPress, isSelected, selectedColor}) => {
    const getStatusColor = () => {
        if(isSelected){
            return selectedColor
        }
        return "#ffffff"
    }

  return (
    <TouchableOpacity
        onPress={onPress}
      className=" justify-between flex-row bg-white border-2 border-slate-50 rounded-xl mt-2">
      <View className ="p-2">
        <Text className=" font-psemibold text-lg ">{getDriveName(driver)}</Text>
        <Text className=" font-pregular">{driver.passport}</Text>
        <Text className=" font-pregular">{driver.email}</Text>
        <Text className=" font-pregular">{formatDate(driver.birthday)}</Text>
        
      </View>
      <View className="w-1 rounded-r-xl" style={{backgroundColor: getStatusColor()}} />
    </TouchableOpacity>
  )
}

export default ExtendedDriverCard