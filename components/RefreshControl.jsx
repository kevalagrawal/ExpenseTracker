// components/RefreshControl.js
import React from 'react'
import { RefreshControl as RNRefreshControl } from 'react-native'

const RefreshControl = ({ refreshing, onRefresh }) => {
  return (
    <RNRefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={['#4CAF50']} // Android
      tintColor="#4CAF50"   // iOS
      title="Refreshing..."
      titleColor="#4CAF50"
    />
  )
}

export default RefreshControl