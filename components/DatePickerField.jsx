import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import CustomButton from './CustomButton';

const DatePickerField = ({
  title,
  value,
  placeholder,
  handleChange,
  otherStyles,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    console.log(value)
    setDate(dayjs(value));
  }, [value]);

  const handleCancel = () => {
    setShow(false);
  };

  const handleAccept = () => {
    handleChange(date.toDate());
    setShow(false);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base mb-2 text-gray-100 font-pmedium">{title}</Text>

      <TouchableWithoutFeedback onPress={showDatepicker}>
        <View className="w-full h-16 px-4 bg-white rounded-2xl border-2 border-slate-50 flex flex-row items-center">
          <Text className="flex-1 text-secondary font-psemibold text-base">
            {value ? dayjs(value).format('DD/MM/YYYY') : placeholder}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      {show && (
        <Modal
          transparent={false}
          animationType="slide"
          visible={show}
          onRequestClose={() => setShow(false)}
        >
          <View className="flex justify-center items-center h-full bg-primary px-2">
            <DateTimePicker
              mode="single"
              date={date.toDate()}
              selectedItemColor='#6366f1'
              onChange={(params) => setDate(dayjs(params.date))}
              {...props}
            />
            <View className="flex flex-row w-full my-2 px-2">
              <CustomButton
                title="Cancel"
                containerStyles="flex-1 bg-red"
                handlePress={handleCancel}
              />
              <View className="w-2" />
              <CustomButton
                title="Accept"
                containerStyles="flex-1"
                handlePress={handleAccept}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default DatePickerField;
