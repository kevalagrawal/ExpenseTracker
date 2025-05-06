import { View, Text, StyleSheet, Alert } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import BackButton from '@/components/BackButton'
import Input from '@/components/Input'
import * as Icons from 'phosphor-react-native'
import { router } from 'expo-router'
import { Pressable } from 'react-native'
import Button from '@/components/Button'

export default function Login() {
    const emailRef = React.useRef('');
    const passwordRef = React.useRef('');

    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = () => {
        if(!emailRef.current || !passwordRef.current){
            Alert.alert("Please fill all the fields");
            return;
        }
        console.log(emailRef.current, passwordRef.current);
        
    }

  return (
    <ScreenWrapper>
        <View style={styles.container}>
            {/*back button */}
            <BackButton iconSize={28}></BackButton>
            <View style={{gap:5,marginTop:spacingY._20}}>
                <Typo size={30} fontWeight={"800"}>Hey,</Typo>
                <Typo size={30} fontWeight={"800"}>Welcome Back</Typo>
            </View>

            <View style={styles.form}>
                <Typo size={16} color={colors.textLighter}>Login now to track all your expenses</Typo>

                <Input
                placeholder='Enter your email'
                onChangeText={value=>emailRef.current=value}
                icon={<Icons.At size={verticalScale(26)} color={colors.neutral300}
                weight='fill'
                ></Icons.At>}
                />
                <Input
                placeholder='Enter your password'
                onChangeText={value=>passwordRef.current=value}
                secureTextEntry={true}
                icon={<Icons.Lock size={verticalScale(26)} color={colors.neutral300}
                weight='fill'
                ></Icons.Lock>}
                />
                <Pressable onPress={()=>{
                    router.push("/(auth)/forgot")
                }}>
                <Typo size={14} color={colors.neutral300} style={{alignSelf:'flex-end', textDecorationLine:"underline"}}
                >
                    Forgot Password?
                </Typo>
                <Button loading={isLoading} onPress={handleSubmit} style={{marginTop:spacingY._20}}>
                    <Typo fontWeight={'700'} color={colors.black} size={21}>Login</Typo>
                </Button>
                </Pressable>
            </View>
            {/*footer*/}
            <View style={styles.footer}>
                <Typo size={15}>
                    Don't have an account?
                </Typo>
                <Pressable onPress={()=>{
                    router.navigate("/(auth)/register")}}>
                    <Typo size={15} fontWeight={"700"} color={colors.primary}>
                        SignUp
                    </Typo>
                </Pressable>
            </View>
        </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        gap:spacingY._30,
        paddingHorizontal:spacingX._20,
    },
    welcomeText:{
        fontSize:verticalScale(20),
        fontWeight:"bold",
        color:colors.text
    },
    form:{
        gap:spacingY._20,
    },
    forgetPassword:{
        textAlign:"right",
        fontWeight:"500",
        color:colors.text,
    },
    footer:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:5
    },
    footerText:{
        textAlign:"center",
        color:colors.text,
        fontSize:verticalScale(15),
    }
})