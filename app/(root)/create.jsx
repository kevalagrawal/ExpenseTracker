import { View, Text, Alert, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack'
import { styles } from '../../assets/styles/create.styles'
import { COLORS } from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import CustomAlert from '../../components/CustomAlert'


const CATEGORY_ICONS = [
    {id:"food", name:"Food & Drinks", icon:"fast-food"},
    {id:"shopping", name:"Shopping", icon:"cart"},
    {id:"transportation", name:"Transportation", icon:"car"},
    {id:"entertainment", name:"Entertainment", icon:"film"},
    {id:"bills", name:"Bills", icon:"receipt"},
    {id:"income", name:"Income", icon:"cash"},
    {id:"other", name:"Other", icon:"ellipsis-horizontal"},
]

export default function create() {
  const router = useRouter()
  const {user}= useUser()

  const [alertVisible, setAlertVisible] = useState(false);
const [alertMessage, setAlertMessage] = useState("");

const showAlert = (message, success = false, onConfirmCallback = () => {}) => {
  setAlertType(success ? "success" : "error");
  setAlertMessage(message);
  setOnAlertConfirm(() => onConfirmCallback);
  setAlertVisible(true);
};


  const [title, setTitle] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [isExpense, setIsExpense] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)

  const [alertType, setAlertType] = useState("error");
const [onAlertConfirm, setOnAlertConfirm] = useState(() => () => {});


  const handleCreate=async () => {
     if (!title.trim()) return showAlert("Please enter a title for the transaction");
  if (!amount.trim() || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0)
    return showAlert("Please enter a valid amount for the transaction");
  if (!category.trim()) return showAlert("Please select a category for the transaction");
    setIsLoading(true)
    try {
      const formattedAmount = isExpense?-Math.abs(parseFloat(amount)):Math.abs(parseFloat(amount))

      const response = await fetch("https://expense-backendone.onrender.com/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user?.id,
          title,
          amount: formattedAmount,
          category
        })
      })

      if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create transaction");
      }
      showAlert("Transaction created successfully", true)
      router.back()
    } catch (error) {
      console.error("Error creating transaction:", error);
      showAlert(error.message || "Failed to create transaction", false)
    }
    finally{
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text}></Ionicons>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Transaction</Text>
        <TouchableOpacity style={[styles.saveButtonContainer,isLoading&&styles.saveButtonDisabled]}
        onPress={handleCreate}
        disabled={isLoading}
        >
        <Text style={styles.saveButton}>{isLoading?"Saving...":"Save"}</Text>
        {!isLoading && <Ionicons name="checkmark" size={22} color={COLORS.primary}/>}
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.typeSelector}>
          <TouchableOpacity style={[styles.typeButton,isExpense&&styles.typeButtonActive]}
          onPress={()=>setIsExpense(true)}
          >
            <Ionicons name="arrow-down-circle" size={22} color={isExpense?COLORS.white:COLORS.expense}
            style={styles.typeIcon}
            />
            <Text style={[styles.typeButtonText,isExpense&&styles.typeButtonTextActive]}>Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.typeButton,!isExpense&&styles.typeButtonActive]}
          onPress={()=>setIsExpense(false)}
          >
            <Ionicons name="arrow-up-circle" size={22} color={!isExpense?COLORS.white:COLORS.income}
            style={styles.typeIcon}
            />
            <Text style={[styles.typeButtonText,!isExpense&&styles.typeButtonTextActive]}>Income</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
          style={styles.amountInput}
          placeholder='0.00'
          placeholderTextColor={COLORS.textLight}
          keyboardType='numeric'
          value={amount}
          onChangeText={setAmount}
          ></TextInput>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons 
          name='create-outline'
          size={22}
          color={COLORS.textLight}
          style={styles.inputIcon}
          ></Ionicons>

          <TextInput 
          style={styles.input}
          placeholder='Transaction Title'
          placeholderTextColor={COLORS.textLight}
          value={title}
          onChangeText={setTitle}
          ></TextInput>
        </View>
        <Text style={styles.sectionTitle}>
          <Ionicons name="pricetag-outline" size={16} color={COLORS.text}>Category</Ionicons>
        </Text>

        <View style={styles.categoryGrid}>
          {CATEGORY_ICONS.map((item) => (
            <TouchableOpacity key={item.id} style={[styles.categoryButton, category === item.name && styles.categoryButtonActive]}
              onPress={() => setCategory(item.name)}>
              <Ionicons name={item.icon} size={20} color={category === item.name ? COLORS.white : COLORS.text}
                style={styles.categoryIcon} />
              <Text style={[styles.categoryButtonText, category === item.name && styles.categoryButtonTextActive]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>

      <CustomAlert
  visible={alertVisible}
  title={alertType === "success" ? "Success" : "Error"}
  message={alertMessage}
  type={alertType}
  onConfirm={() => {
    setAlertVisible(false);
    onAlertConfirm();
  }}
  confirmText="OK"
/>



      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large"
          color={COLORS.primary}
          ></ActivityIndicator>
        </View>
      )}
    </View>
  )
}