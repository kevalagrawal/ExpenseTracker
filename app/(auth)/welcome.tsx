import { View, Text, StyleSheet,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Button from '@/components/Button'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { useRouter } from 'expo-router'

export default function Welcome() {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={()=>{
            router.push("/(auth)/login")
          }} style={styles.loginButton}>
            <Typo fontWeight={"500"}>
              Sign in
            </Typo>
          </TouchableOpacity>
          <Animated.Image 
            entering={FadeIn.duration(2000)}
            style={styles.welcomeImage}
            resizeMode="contain"
            source={require('../../assets/images/welcome.png')}></Animated.Image>
        </View>
        {/*footer*/}
        <View style={styles.footer}>
          <Animated.View
          entering={FadeInDown.duration(1000).springify().damping(12)}
          style={{alignItems:"center"}}>
            <Typo size={30} fontWeight={"800"}>Always take control</Typo>
            <Typo size={30} fontWeight={"800"}>of your finances</Typo>
          </Animated.View>
          <Animated.View 
          entering={FadeInDown.delay(100).duration(1000).springify().damping(12)}
          style={{alignItems:"center", gap:2}}>
            <Typo size={17} color={colors.textLight}>Finances must be arranged to set a better</Typo>
            <Typo size={17} color={colors.textLight}>lifestyle in future</Typo>
          </Animated.View>

          <Animated.View 
          entering={FadeInDown.delay(200).duration(1000).springify().damping(12)}
          style={styles.buttonContainer}>
            <Button onPress={()=>{
            router.push("/(auth)/register")
          }}>
              <Typo
              size={22}
              color={colors.neutral900}
              fontWeight={"600"}
              >Get Started</Typo>
            </Button>
          </Animated.View>

        </View>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop:spacingY._7,
  },
  welcomeImage: {
    width:"100%",
    height:verticalScale(300),
    alignSelf:"center",
    marginTop:verticalScale(100),
  },
  loginButton:{
    alignSelf:"flex-end",
    marginRight:spacingX._20,
  },
  footer:{
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,

    shadowColor: "#ffffff",
    shadowOffset: {
    width: 0,
    height: -4,
},
    shadowOpacity: 0.25,   
    shadowRadius: 30,

elevation: 15},
  buttonContainer:{
    width:"100%",
    paddingHorizontal:spacingX._25,
  }
})