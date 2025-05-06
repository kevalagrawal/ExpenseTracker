import { View, Text, StyleSheet, Alert } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import BackButton from '@/components/BackButton'
import Input from '@/components/Input'
import * as Icons from 'phosphor-react-native'
import { router, useRouter } from 'expo-router'
import { Pressable } from 'react-native'
import Button from '@/components/Button'
// import { useAuth } from '@/contexts/authContext'


export default function RegisterScreen() {
    const emailRef = React.useRef('');
    const passwordRef = React.useRef('');
    const nameRef = React.useRef('');
    const router = useRouter();
    // const {register:registerUser} = useAuth();

    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async() => {}
    //     if(!emailRef.current || !passwordRef.current || !nameRef.current){
    //         Alert.alert("Please fill all the fields");
    //         return;
    //     }
    //     setIsLoading(true);
    //     const res = await registerUser(emailRef.current, passwordRef.current, nameRef.current);
    //     setIsLoading(false);
        
    // }

  return (
    <ScreenWrapper>
        <View style={styles.container}>
            {/*back button */}
            <BackButton iconSize={28}></BackButton>
            <View style={{gap:5,marginTop:spacingY._20}}>
                <Typo size={30} fontWeight={"800"}>Let's</Typo>
                <Typo size={30} fontWeight={"800"}>Get Started</Typo>
            </View>

            <View style={styles.form}>
                <Typo size={16} color={colors.textLighter}>Create an account to track all your expenses</Typo>

                <Input
                placeholder='Enter your name'
                onChangeText={value=>nameRef.current=value}
                icon={<Icons.User size={verticalScale(26)} color={colors.neutral300}
                weight='fill'
                ></Icons.User>}
                />
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
                <Button loading={isLoading} onPress={handleSubmit} style={{marginTop:spacingY._20}}>
                    <Typo fontWeight={'700'} color={colors.black} size={21}>Sign Up</Typo>
                </Button>
                
            </View>
            {/*footer*/}
            <View style={styles.footer}>
                <Typo size={15}>
                    Already have an account?
                </Typo>
                <Pressable onPress={()=>{
                    router.navigate("/(auth)/login")}}>
                    <Typo size={15} fontWeight={"700"} color={colors.primary}>
                        Login
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