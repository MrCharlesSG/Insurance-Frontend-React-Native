import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import SearchInput from "../../components/SearchInput";
import { getDriversByVehicle } from "../../lib/sb-drivers";
import { getDriveName } from "../../utils/string-utils";
import FormFieldTitle from "../../components/FormFieldTitle";
import DriverCard from "../../components/DriverCard";
import { getVehicleByPlate } from "../../lib/sb-vehicle";
import { icons } from "../../constants";
import ProgressBar from "../../components/ProgressBar";
import { TOTAL_STEPS_CREATING_REPORT } from "../../constants/values";
import HeaderWithBack from "../../components/HeaderWithBack";


const InfoReportDriver = () => {
  const navigation = useNavigation();
  const context = useGlobalContext();
  const { setCreatingReport, creatingReport, user } = context;
  const isYours = creatingReport.infoReportDriverA ? false : true;
  const initialFormState = {
    vehicle: null,
    driver: null,
    damages: "Bad Things"
  };
  const [form, setForm] = useState(initialFormState);
  const [vehiclePlate, setVehiclePlate] = useState("5678DEF")

  const [loadingList, setLoadingList] = useState(false);
  const [drivers, setDrivers] = useState([]);

  const title = isYours ? "Your" : "Other";

  const searchDrivers = async (query) => {
    if(!isYours){
      searchDriversAux(query)
    }
  };

  const searchDriversAux = async (query) => {
    setLoadingList(true);
    const result = await getDriversByVehicle(context, query);
    setDrivers(result);
    setLoadingList(false);
  };

  const searchVehicle = async (plate) => {
    try {
      const vehicle = await getVehicleByPlate(context, plate)
      setForm({...form, vehicle: vehicle})
    } catch (error) {
      Alert.alert("Wrong Vehicle", "Vehicle with that plate ("+plate+") Not Found")
    }
  }

  useEffect(() => {
    if (isYours) {
      setVehiclePlate(user)
      searchDriversAux(user)
      searchVehicle(user)
    }
  }, []);

  const handleBack = () => {
    if(isYours){
      navigation.goBack()
    }else{
      setCreatingReport({
        date:creatingReport.date,
        details:creatingReport.details,
        place:creatingReport.place
      })
      setVehiclePlate(user)
      searchDriversAux(user)
      searchVehicle(user)
      setForm(initialFormState)
      navigation.navigate('(report-create)/info-report-driver');
    }
  }

  const handleOnNext = () =>  {
    if(isYours){
      const newReport = {
        infoReportDriverA:{
          vehicle:form.vehicle,
          driver:form.driver,
          damages:form.damages,
          status: "ACCEPTED"
        },
        date: creatingReport.date,
        place: creatingReport.place,
        details: creatingReport.details
      }
      setCreatingReport(newReport)
      setForm(initialFormState)
      setDrivers([])
      setVehiclePlate("5678DEF")
      console.log(JSON.stringify(form))
      navigation.navigate('(report-create)/info-report-driver');
    }else{
      const newReport = {...creatingReport, 
        infoReportDriverB:{
          vehicle:form.vehicle,
          driver:form.driver,
          status: "WAITING"
        }
        
      }
      console.log(JSON.stringify(newReport))
      setCreatingReport(newReport)
      const reportToString = JSON.stringify(newReport)
      console.log("ESTE ES EL REPORT A CREAR "+reportToString)
      navigation.navigate('(report-create)/create-report-summary')
    }     
       
  }

  const handleOnQuery = (query) => {
    if(!isYours){
      setLoadingList(true);
      setVehiclePlate(query)
      searchVehicle(query)
      searchDrivers(query);
    }
  }

  const handleCancel = () =>{
    setCreatingReport(null)
    router.push("create-report")
  }

  return (
    <SafeAreaView className="bg-primary h-full flex flex-col">

    <HeaderWithBack
      handleBack={handleBack}
      title={
        <>
          {`Create Report\n`}<Text className=" text-secondary-100">{`${title} Data`}</Text>
        </>
      }
    />
      <View className="px-4 w-full flex-1 flex flex-col ">
        
        <FormFieldTitle otherStyles="mt-5" title={"Vehicle"} />
        <SearchInput 
          initialValue={vehiclePlate}
          placeholder={"Plate of the vehicle"}
          setValue={(e) => setVehiclePlate(e)}
          onPress={(query) => {
            handleOnQuery(query)
          }}
          editable={!isYours}
        />

        <FormFieldTitle otherStyles="mt-5" title={"Drivers"} />
        <View className=" flex-1">
        {loadingList ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          
            <>
            {drivers.length > 0 ? (
              <FlatList
                data={drivers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <DriverCard 
                    driver={item}
                    onPress={() => {
                      if(form.driver && form.driver.id == item.id){
                        setForm({ ...form, driver: null })
                      }else{
                        setForm({ ...form, driver: item })
                      }

                    }}
                    isSelected={form.driver?form.driver.id===item.id:false}
                  />
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            ) : (
              <Text className="text-lg text-center mb-4 ">No drivers for this vehicle</Text>
            )}
            </>
        )}
        </View>

        <Text className=" w-full text-base text-gray-100 font-pmedium ">Selected Driver: <Text className={`${form.driver?" text-secondary-100":" text-gray-100"}  text-lg`}>{form.driver? getDriveName(form.driver):"No driver selected"}</Text></Text>

        <FormField 
          title={"Damages"}
          value={form.damages}
          placeholder={"What damages the vehicle has"}
          handleChangeText={(e) => setForm({ ...form, damages:e})}
          otherStyles={"mt-5"}
          numberOfLines={5} 
          multiline={true}
        />
      </View>
      <View className=" flex flex-row w-full my-2 px-4">
          <CustomButton 
            title={"Cancel"}
            containerStyles={"w-1/3 bg-white "}
            textStyles={" text-red"}
            handlePress={handleCancel}
          />
          <View className="w-2" />
          <CustomButton 
            title={"Next"}
            containerStyles={"flex-1"}
            handlePress={handleOnNext}
          />
        </View>
        <ProgressBar
          step={isYours? 2: 3}
          total={TOTAL_STEPS_CREATING_REPORT+1}
        />
    </SafeAreaView>
  );
};

export default InfoReportDriver;