import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import GlobalProvider from "../context/GlobalProvider";
import ProtectedLayout from "../context/ProtectedLayout";

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    });

    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);

    if (!fontsLoaded) {
        return null;
    }

    if (!fontsLoaded && !error) {
        return null;
    }

    return (
        <GlobalProvider>
          <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          
            <Stack.Screen name="(report-create)/create-report-summary" options={{ headerShown: false, animation:'slide_from_right', animationDuration:5 }} />
            <Stack.Screen name="(report-create)/info-report-driver" options={{ headerShown: false, animation:'slide_from_bottom', animationDuration:5 }} />
            <Stack.Screen name="(profile)/log-out" options={{ headerShown: false, animation:'slide_from_right' } } />
            <Stack.Screen name="(profile)/drivers" options={{ headerShown: false, animation:'slide_from_right' } } />
            <Stack.Screen name="(profile)/personal-info" options={{ headerShown: false, animation:'slide_from_right' } } />
            <Stack.Screen name="(profile)/associate-driver" options={{ headerShown: false, animation:'slide_from_right' } } />
            
            <Stack.Screen 
              name="report-details/[report]" 
              options={{ headerShown: false, animation:'slide_from_left', animationDuration:10 }} />
              
          </Stack>
          <StatusBar backgroundColor={"#f1f5f9"} />
        </GlobalProvider>
    )
}

export default RootLayout;
