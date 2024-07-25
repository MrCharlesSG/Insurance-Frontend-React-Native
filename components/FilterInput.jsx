import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { icons } from '../constants';

const FilterInput = ({ value, setValue, values, defaultValue, containerStyles }) => {
    const isDefaultValue = value.label !== defaultValue.label;

  return (
    <View className={`flex flex-row items-center justify-center space-x-4 flex-1 h-16 px-4 bg-white rounded-2xl border-2 border-slate-50 focus:border-secondary ${containerStyles}`}>
      <Picker
      
        selectedValue={value}
        onValueChange={(itemValue) => setValue(itemValue)}
        style={{ flex: 1, height: 50, color: '#CDCDE0' }}
      >
        {values.map((val, index) => (
          <Picker.Item key={index} label={val.label} value={val} />
        ))}
      </Picker>

      <TouchableOpacity
        onPress={() => {
          setValue(defaultValue)
        }}
      >
        <Image
          source={isDefaultValue ? icons.noFilter : icons.filter}
          tintColor="#4f46e5"
          className="w-5 h-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default FilterInput;
