import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Logo } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";
const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/reports" />;

  return (
    <SafeAreaView className="bg-primary h-full">
    
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Logo
          />

            <View className="relative mt-5">
            <Text className="text-3xl text-black font-bold text-center">
                Seamlessly Manage Your{"\n"}
                Insurance Needs with{" "}
                <Text className="text-secondary-200">Insurance App</Text>
            </Text>
            </View>

            <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Effortlessly Report Claims and Update Your Profile: Experience Peace of Mind with Insurance App
            </Text>


          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      
    </SafeAreaView>
  );
};

export default Welcome;
