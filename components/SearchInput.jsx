import { useState } from "react";
import { View, TouchableOpacity, Image, TextInput, ActivityIndicator } from "react-native";
import { icons } from "../constants";

const SearchInput = ({ initialValue, setValue, onPress, placeholder, editable, error, keyboardType, loading, ...props }) => {
  const [query, setQuery] = useState(initialValue);

  return (
    <View className={`flex flex-row items-center justify-center space-x-4 flex-1 h-16 px-4 bg-white rounded-2xl border-2 ${error ? 'border-red-500' : 'border-slate-50'} focus:border-secondary`}>
      <TextInput
        className="text-base mt-0.5 text-secondary flex-1 font-psemibold"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        editable={editable}
        onChangeText={(e) => setQuery(e)}
        keyboardType={keyboardType}
        {...props}
      />

      <TouchableOpacity
        onPress={() => {
          if (!loading) {
            setValue(query);
            onPress(query);
          }
        }}
        disabled={loading} // Disable the button while loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="#4f46e5" />
        ) : (
          <Image
            source={icons.search}
            tintColor={error ? "#f43f5e":"#4f46e5"}
            className="w-5 h-5"
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
      {error && (
        <Text className=" text-red text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};

export default SearchInput;
