import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { icons } from '../constants'
import { TextInput } from 'react-native-gesture-handler'
import { useNavigation } from 'expo-router'

const ProfileSection = ({direction, title}) => {
    const navigation = useNavigation()
    const handleOnPress = () => {
        navigation.navigate("(profile)/"+direction)
    }
  return (
    <TouchableOpacity
      onPress={handleOnPress}
      className=" justify-between flex-row flex items-center px-2 py-4 bg-white mt-2">
     <Text
        className=" text-lg mt-0.5 text-gray flex-1 font-psemibold"
        
      >{title}</Text>

      
        <Image source={icons.angular} tintColor="#4f46e5" className="w-5 h-5" resizeMode="contain" />
      

    </TouchableOpacity>
  )
}

export default ProfileSection