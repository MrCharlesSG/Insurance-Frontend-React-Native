import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyState = ({ title, subtitle, refresh }) => {
  return (
    <View className="flex justify-center items-center px-4">

      <Text className="text-sm font-pmedium text-gray-100">{title}</Text>
      <Text className="text-xl text-center font-psemibold text-secondary mt-2">
        {subtitle}
      </Text>

      <CustomButton
        title="Refresh"
        handlePress={refresh}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
