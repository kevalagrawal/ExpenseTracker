import { useState } from 'react'
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { COLORS } from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'

const coffeeTheme = {
  primary: "#8B593E",
  background: "#FFF8F3",
  text: "#4A3428",
  border: "#E5D3B7",
  white: "#FFFFFF",
  textLight: "#9A8478",
  expense: "#E74C3C",
  income: "#2ECC71",
  card: "#FFFFFF",
  shadow: "#000000",
}

export const SignOutButton = () => {
  const { signOut } = useClerk()
  const [modalVisible, setModalVisible] = useState(false)

  const handleSignOut = async () => {
    try {
      setModalVisible(false)
      await signOut()
      Linking.openURL(Linking.createURL('/'))
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <>
      {/* Trigger button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="log-out-outline" size={22}   color={COLORS.text}></Ionicons>
      </TouchableOpacity>

      {/* Custom Alert Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Are you sure you want to sign out?</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSignOut} style={styles.confirmButton}>
                <Text style={styles.confirmText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: coffeeTheme.background,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    elevation: 5,
    borderColor: coffeeTheme.border,
    borderWidth: 1,
  },
  modalTitle: {
    color: coffeeTheme.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: coffeeTheme.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: coffeeTheme.border,
  },
  cancelText: {
    color: coffeeTheme.text,
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: coffeeTheme.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  confirmText: {
    color: coffeeTheme.white,
    fontWeight: '600',
  },
  logoutButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  }
})
