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
  const isYours = creatingReport?.infoReportDriverA ? false : true;
  const initialFormState = {
    vehicle: null,
    driver: null,
    damages: ""
  };
  const [form, setForm] = useState(initialFormState);
  const [vehiclePlate, setVehiclePlate] = useState(isYours ? user : "");
  const [loadingList, setLoadingList] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [errors, setErrors] = useState({
    vehicle: "",
    driver: "",
    damages: ""
  });

  const title = isYours ? "Your" : "Other";

  const searchDrivers = async (query) => {
    if (!isYours) {
      searchDriversAux(query);
    }
  };

  const searchDriversAux = async (query) => {
    const result = await getDriversByVehicle(context, query);
    setDrivers(result);
  };

  const searchVehicle = async (plate) => {
    try {
      const vehicle = await getVehicleByPlate(context, plate);
      setForm({ ...form, vehicle: vehicle });
    } catch (error) {
      Alert.alert("Wrong Vehicle", "Vehicle with that plate (" + plate + ") Not Found");
      setErrors({ ...errors, vehicle: "Vehicle not found" });
    }
  };

  useEffect(() => {
    console.log("---NEW")
    if (isYours) {
      console.log("--------------IS YOURS")
      setVehiclePlate(user);
      searchDriversAux(user);
      searchVehicle(user);
    }
  }, []);

  const handleBack = () => {
    if (isYours) {
      setVehiclePlate(user)
      navigation.goBack();
    } else {
      setCreatingReport({
        date: creatingReport.date,
        details: creatingReport.details,
        place: creatingReport.place
      });
      setVehiclePlate(user);
      searchDriversAux(user);
      searchVehicle(user);
      setForm(initialFormState);
      navigation.navigate('(report-create)/info-report-driver');
    }
  };

  const handleOnNext = () => {
    let valid = true;
    let newErrors = {
      vehicle: "",
      driver: "",
      damages: ""
    };

    if (!form.vehicle) {
      newErrors.vehicle = "Vehicle is required";
      valid = false;
    }
    if (!form.driver) {
      newErrors.driver = "Driver is required";
      valid = false;
    }
    if (!form.damages) {
      newErrors.damages = "Damages description is required";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    if (isYours) {
      const newReport = {
        infoReportDriverA: {
          vehicle: form.vehicle,
          driver: form.driver,
          damages: form.damages,
          status: "ACCEPTED"
        },
        date: creatingReport.date,
        place: creatingReport.place,
        details: creatingReport.details
      };
      console.log("NEW")
      setCreatingReport(newReport);
      setForm(initialFormState);
      setDrivers([]);
      setVehiclePlate("");
      setErrors({
        vehicle: "",
        driver: "",
        damages: ""
      })

      console.log("Plate " + vehiclePlate)
      console.log("Form "+  JSON.stringify(form))
    } else {
      const newReport = {
        ...creatingReport,
        infoReportDriverB: {
          vehicle: form.vehicle,
          driver: form.driver,
          status: "WAITING"
        }
      };
      setCreatingReport(newReport);
      navigation.navigate('(report-create)/create-report-summary');
    }
  };

  const handleOnQuery = (query) => {
    if (!isYours) {
      setLoadingList(true);
      setVehiclePlate(query);
      searchVehicle(query);
      searchDrivers(query);
      setLoadingList(false);
    }
  };

  const handleCancel = () => {
    setCreatingReport(null);
    router.push("reports");
  };

  return (
    <SafeAreaView className="bg-primary h-full flex flex-col">
      <HeaderWithBack
        handleBack={handleBack}
        title={
          <>
            {`Create Report\n`}<Text className="text-secondary-100">{`${title} Data`}</Text>
          </>
        }
      />
      <ScrollView className="px-4 w-full flex-1 flex flex-col ">
        <FormFieldTitle otherStyles="mt-5" title={"Vehicle"} />
        <SearchInput
          initialValue={vehiclePlate}
          placeholder={"Plate of the vehicle"}
          setValue={(e) => setVehiclePlate(e)}
          onPress={(query) => handleOnQuery(query)}
          loading={loadingList}
          editable={!isYours}
          error={errors.vehicle}
        />

        <FormFieldTitle otherStyles="mt-5" title={"Drivers"} />
        <View className="flex-1">
          <FlatList
            data={drivers}
            horizontal={true}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <DriverCard
                driver={item}
                onPress={() => {
                  if (form.driver && form.driver.id === item.id) {
                    setForm({ ...form, driver: null });
                  } else {
                    setForm({ ...form, driver: item });
                  }
                }}
                isSelected={form.driver ? form.driver.id === item.id : false}
              />
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>

        <Text className="w-full text-base text-gray-100 font-pmedium">
          Selected Driver: <Text className={`${form.driver ? "text-secondary-100" : "text-gray-100"} text-lg`}>{form.driver ? getDriveName(form.driver) : "No driver selected"}</Text>
        </Text>
        {errors.driver && (
          <Text className=" text-red text-sm mt-1">
            {errors.driver}
          </Text>
        )}

        <FormField
          title={"Damages"}
          value={form.damages}
          placeholder={"What damages the vehicle has"}
          handleChangeText={(e) => setForm({ ...form, damages: e })}
          otherStyles={"mt-5"}
          numberOfLines={5}
          multiline={true}
          error={errors.damages}
        />
      </ScrollView>
      <View className="flex flex-row w-full my-2 px-4">
        <CustomButton
          title={"Cancel"}
          containerStyles={"w-1/3 bg-white "}
          textStyles={"text-red"}
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
        step={isYours ? 2 : 3}
        total={TOTAL_STEPS_CREATING_REPORT + 1}
      />
    </SafeAreaView>
  );
};

export default InfoReportDriver;
