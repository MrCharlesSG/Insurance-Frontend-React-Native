import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { Logo, FormField, CustomButton} from '../../components'
import { signIn } from "../../lib/sb-auth";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const context = useGlobalContext()

  const submit = async () => {
    /*if (form.username === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
      */

    setSubmitting(true);

    try {
      //await signIn(form.username, form.password);
      await signIn("1234ABC", "user", context);
      
      /*const result = await getCurrentUser();
      setUser(result);
      
      setIsLogged(true);
      */

      router.replace("/reports");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
         <Logo />

          <Text className="text-2xl font-semibold text-gray-100 mt-10 font-psemibold">
            Log in to Insurance App
          </Text>

          <FormField
            title="username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            keyboardType="username-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn