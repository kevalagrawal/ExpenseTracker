import { View, Text,StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../constants/theme'
import { Image } from 'react-native'
import { useRouter } from 'expo-router'


export default function HomeScreen() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/(auth)/welcome")
    }
    , 1500)
  }, [])
  return (
    <View style={styles.container}>
      <Image 
      style={styles.logo}
      resizeMode="contain"
      source={require('../assets/images/splashImage.png')}></Image>
    </View>
  )
}

const styles =  StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:colors.neutral900
  },
  logo:{
    height:"20%",
    aspectRatio:1
  }
})