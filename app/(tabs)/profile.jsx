import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images, icons } from "../../constants";
import { CustomButton, Logo } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import ProfileSection from "../../components/ProfileSection";

const Profile = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
    
    <View className="flex my-6 px-4 space-y-4  items-center justify-center flex-col">
            <Logo />
            <Image source={images.usuario} tintColor={"#f1f5f9"} resizeMode="contain" className=" h-60 bg-secondary-50 w-60 rounded-3xl"/>
          </View>
    <ProfileSection 
      title={"Personal Info"}
      direction={"personal-info"}
    />
    <ProfileSection 
      title={"Drivers"}
      direction={"drivers"}
    />
    <ProfileSection 
      title={"Log Out"}
      direction={"log-out"}
    />

      
    </SafeAreaView>
  )
}

export default Profile