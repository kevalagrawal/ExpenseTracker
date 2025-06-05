import { HeaderShownContext } from "@react-navigation/elements";
import { Stack } from "expo-router";
import  SafeScreen  from "@/components/SafeScreen"
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from 'expo-router'
import { Redirect } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'


export default function RootLayout() {
  return (
  <ClerkProvider tokenCache={tokenCache}>
  <SafeScreen>
      <Slot />
  </SafeScreen>
  </ClerkProvider>
  );
}