import { useEffect, useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { icons } from "../constants";

const SearchInput = ({ initialValue, setValue, onPress, placeholder, editable, keyboardType, ...props }) => {

  const [query, setQuery] = useState(initialValue)

  return (
    <View className="flex flex-row items-center justify-center space-x-4 flex-1 h-16 px-4 bg-white rounded-2xl border-2 border-slate-50 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-secondary flex-1 font-psemibold"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        editable={editable}
        onChangeText={(e) => setQuery(e)}
        keyboardType={keyboardType}
      />

      <TouchableOpacity
        onPress={() => {
          setValue(query)
          onPress(query)
        }}
      >
        <Image source={icons.search} tintColor="#4f46e5" className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
