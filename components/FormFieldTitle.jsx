import { View, Text } from 'react-native'
import React from 'react'

const FormFieldTitle = ({title, otherStyles}) => {
  return (
    <Text className={`text-base text-gray-100 font-pmedium ${otherStyles}`}>{title}</Text>
  )
}

export default FormFieldTitle