import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { icons } from '../constants'

const HeaderWithBack = ({title, handleBack, otherTitleStyles}) => {
  return (
    <View className=" flex flex-row mt-5 items-center">
      <TouchableOpacity
        onPress={handleBack}
        className={`absolute z-10 left-3 `} 
      >
      <Image 
        source={icons.angular} 
        tintColor="#94a3b8" 
        className="w-7 h-7 rotate-180"
        resizeMode="contain" />
      </TouchableOpacity>

      <Text className={` w-full text-center text-2xl font-semibold text-secondary font-psemibold ${otherTitleStyles}`}>{title}</Text>
    </View>
  )
}

export default HeaderWithBack