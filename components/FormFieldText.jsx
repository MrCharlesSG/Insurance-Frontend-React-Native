import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const FormFieldText = ({
  title,
  value,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

        <View className="w-full px-4 py-4 bg-white rounded-2xl border-2 border-slate-50 focus:border-secondary flex flex-row items-center">
        <Text
          className="flex-1 text-secondary font-psemibold text-base"
          
          {...props}
        >{value}</Text>
      </View>
    </View>
  );
};

export default FormFieldText;
