import { View, Text } from 'react-native'
import React from 'react'

const ProgressBar = ({step, total}) => {
  return (
    <View className="w-full flex flex-row h-3 bg-primary ">
      <View className={`bg-secondary-50 rounded-r-lg`} style={{width: `${(step/total)*100}%`}} />
    </View>
  )
}

export default ProgressBar