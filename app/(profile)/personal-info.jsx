import { View, Text, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { getVehicleByPlate } from '../../lib/sb-vehicle'
import { useGlobalContext } from '../../context/GlobalProvider'
import FormFieldText from '../../components/FormFieldText'
import HeaderWithBack from '../../components/HeaderWithBack'
import { router, useNavigation } from 'expo-router'

const PersonalInfo = () => {
  const context = useGlobalContext()
  const navigation = useNavigation()
  const { user } = context
  const [personalInfo, setPersonalInfo] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await getVehicleByPlate(context, user)
        setPersonalInfo(info)
      } catch (error) {
        console.error('Error fetching vehicle info:', error)
      }
    }

    fetchData()
  }, [context, user])

  const handleBack = () => {
    router.back()
  }

  return (
    <SafeAreaView className="bg-primary h-full flex flex-col ">
    <View className=" mt-10">
      <HeaderWithBack
        handleBack={handleBack}
        title={"Associate Driver"}

      />
    </View>
      <View className="p-4">
      <FormFieldText 
        title={"Plate"}
        value={personalInfo.plate}
        otherStyles={" mt-5"}
      />
      <FormFieldText 
        title={"Brand"}
        value={personalInfo.brand}
        otherStyles={" mt-5"}
      />
      <FormFieldText 
        title={"Model"}
        value={personalInfo.model}
        otherStyles={" mt-5"}
      />
      <FormFieldText 
        title={"Manufacturing Year"}
        value={personalInfo.manufacturingYear}
        otherStyles={" mt-5"}
      />
      </View>
    </SafeAreaView>
  )
}

export default PersonalInfo
