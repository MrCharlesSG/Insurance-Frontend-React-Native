import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import HeaderWithBack from '../../components/HeaderWithBack'
import { router } from 'expo-router'
import { CustomButton, Logo } from '../../components'
import { useGlobalContext } from '../../context/GlobalProvider'
import {logOut} from "../../lib/sb-auth"

const LogOut = () => {
    const context = useGlobalContext()
    
    const [loading, setLoading] = useState(false)

    const handleBack = () => {
        router.back()
    }

    const handleLogOut = () => {
        try {
          setLoading(true)
          logOut(context)
          setLoading(false)
        } catch (error) {
          console.log(error.message)
        } finally{
          router.push("sign-in")
        }
    }

  return (
    <SafeAreaView className="bg-primary h-full flex flex-col ">
    <View className=" mt-10">
      <HeaderWithBack
        handleBack={handleBack}
        title={"Log Out"}
        otherTitleStyles={"text-red"}
      />
      <View className="w-full flex justify-center items-center h-full -mt-10 px-4">
        

            <View className="relative mt-5">
            <Text className="text-3xl text-black font-bold text-center">
            You are about to log out from{"\n"}
            <Text className="text-red-100">Insurance App</Text>
            </Text>
            <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Understand you will need to sign in next time.{"\n"}
            We hope to see you back soon!
            </Text>
            </View>


          <CustomButton
            title="Log Out"
            handlePress={handleLogOut}
            isLoading={loading}
            containerStyles="w-full mt-7 bg-red"
            textStyles={"text-2xl"}
          />
          </View>
        </View>
    </SafeAreaView>
  )
}

export default LogOut