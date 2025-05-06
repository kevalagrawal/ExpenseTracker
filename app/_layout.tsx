import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AuthProvider from "@/contexts/authContext";

const StackLayout=()=> {
  return (
    <SafeAreaProvider>
        <Slot/>
  <Stack screenOptions={{ headerShown: false }} />
    <StatusBar style="dark" />
    </SafeAreaProvider>
  )
}

export default function RootLayout(){
    return(
        <AuthProvider>
            <StackLayout/>
        </AuthProvider>
    )
}