import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors'; // adjust import path as needed

export default function CustomAlert({ visible, title, message, onCancel, onConfirm, cancelText = "Cancel", confirmText = "OK",
  type = "error",  }) {

  const isSuccess = type === "success";
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.container, { borderLeftColor: isSuccess ? COLORS.income : COLORS.expense, borderLeftWidth: 5 }]}>
          <Text style={[styles.title, { color: isSuccess ? COLORS.income : COLORS.expense }]}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.shadow + '80', // semi-transparent black
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 20,
    width: '80%',
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  cancelText: {
    color: COLORS.textLight,
    fontSize: 16,
  },
  confirmText: {
    color: COLORS.white,
    fontSize: 16,
  },
});
