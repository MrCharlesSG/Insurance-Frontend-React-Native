import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";
import FormFieldTitle from "./FormFieldTitle";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  editable,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <FormFieldTitle 
        title={title}
      />

      <View className="w-full py-4 px-4 bg-white rounded-2xl border-2 border-slate-50 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-secondary font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#CDCDE0"
          onChangeText={handleChangeText}
          editable={editable}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
