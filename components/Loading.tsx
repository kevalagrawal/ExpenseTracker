import { View, Text, ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'

export default function Loading({
    size="large",
    color = colors.primary,
}:ActivityIndicatorProps) {
  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <ActivityIndicator size={size} color={color}></ActivityIndicator>
    </View>
  )
}