import { useNavigation } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, FormField } from "../../components";
import DatePickerField from "../../components/DatePickerField";
import { useGlobalContext } from "../../context/GlobalProvider";

const CreateReport = () => {
  const navigation = useNavigation()
  const { setCreatingReport } = useGlobalContext();
  const [form, setForm] = useState({
    date: Date.now(),
    place: "Santa Clous",
    details: "Just turn right and then left",
  });

  const submit = async () => {
    
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-secondary font-psemibold">Create Report</Text>
        <Text className="text-2xl text-secondary-200 font-psemibold">Common Information</Text>
        <DatePickerField 
          title={"Date"}
          value={form.date}
          placeholder="When incident has happend"
          handleChange={(e) => setForm({ ...form, date: e })}
          otherStyles={"mt-5"}
        />

        <FormField 
          title={"Place"}
          value={form.place}
          placeholder={"Where incident has happend"}
          handleChangeText={(e) => setForm({ ...form, place:e})}
          otherStyles={"mt-5"}
        />

        <FormField 
          title={"Details"}
          value={form.details}
          placeholder={"What has happend"}
          handleChangeText={(e) => setForm({ ...form, details:e})}
          otherStyles={"mt-5"}
          numberOfLines={5} 
          multiline={true}
        />
        
        <View className=" flex flex-row w-full mt-7">
          
        <CustomButton 
          title={"Reset"}
          containerStyles={"w-1/3 bg-white"}
          textStyles={" text-exalted"}
          handlePress={() => 
            setForm(
              {
    date: Date.now(),
    place: "",
    details: "",
  }
            )
          }
        />
        <View className="w-2" />
        <CustomButton 
          title={"Next"}
          containerStyles={"flex-1"}
          handlePress={() =>  {
            setCreatingReport(form)
            navigation.navigate('(report-create)/info-report-driver')
          }}
        />
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateReport;
