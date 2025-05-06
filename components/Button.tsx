import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/types'
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { colors, radius } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import Loading from './Loading';

export default function Button({
    style,
    onPress,
    loading=false,
    children
}:CustomButtonProps) {
    if(loading){
        return (
            <View style={[styles.button, style, {backgroundColor:"transparent"}]}>
                {/*loading*/}
                <Loading/>
            </View>
        )
    }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: colors.primary,
        borderRadius: radius._17,
        borderCurve:"continuous",
        height: verticalScale(52),
        justifyContent:"center",
        alignItems:"center",
    }
});