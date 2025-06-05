import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, Image} from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from '../../assets/styles/auth.styles'
import { COLORS } from '../../constants/colors.js'
import {Ionicons} from '@expo/vector-icons'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState("")

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if(err.errors?.code === "form_password_incorrect") {
        setError("Incorrect email or password")
      }
      else if(err.errors?.code === "form_identifier_not_found") {
        setError("Couldn't find your account.")
      }
      else{
        setError("An error occurred while signing in. Please try again.")
      }
    }
  }

  return (
    <KeyboardAwareScrollView style={{flex:1}} contentContainerStyle={{flexGrow:1}} 
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={100}
        keyboardShouldPersistTaps="handled">
    <View style={styles.container}>
      <Image source={require("../../assets/images/revenue-i4.png")} style={styles.illustration}></Image>
    <Text style={styles.title}>Welcome Back</Text>

    {error?(
          <View style={styles.errorBox}>
            <Ionicons 
            name="alert-circle"
            size={20}
            color={COLORS.expense}
            ></Ionicons>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={()=>setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight}></Ionicons>
            </TouchableOpacity>
          </View>
        ):null}

      <TextInput
      style={[styles.input, error && styles.errorInput]}
        placeholderTextColor="#9A8478"
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
      style={[styles.input, error && styles.errorInput]}
        placeholderTextColor="#9A8478"
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      
      <TouchableOpacity onPress={onSignInPress} style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
              <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
                <TouchableOpacity onPress={()=>{
                  router.push("sign-up")
                }}>
                  <Text style={styles.linkText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
    </View>
  </KeyboardAwareScrollView>
  )
}