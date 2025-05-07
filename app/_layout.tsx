import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AuthProvider from "@/contexts/authContext";

export default function LayoutScreen() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Slot />
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="dark" />
      </AuthProvider>
    </SafeAreaProvider>
  );
}