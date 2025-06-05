import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link, useFocusEffect, useRouter } from 'expo-router';
import { Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SignOutButton } from '@/components/SignOutButton';
import { useTransactions } from '../../hooks/useTransactions';
import { useCallback, useEffect, useState } from 'react';
import PageLoader from '../../components/PageLoader';
import { styles } from '../../assets/styles/home.styles';
import { Ionicons } from '@expo/vector-icons';
import BalanceCard from '@/components/BalanceCard.jsx';
import TransactionItem from '@/components/TransactionItem.jsx';
import NoTransactionsFound from '@/components/NoTransactionsFound.jsx';
import {RefreshControl} from 'react-native';

export default function Page() {
  const router = useRouter();
  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false);
  const { loading, transactions, summary, loadData, deleteTransactions } = useTransactions(user?.id);

  // Manual pull-to-refresh handler
  const onRefresh = async () => {
  setRefreshing(true);
  try {
    await loadData();
  } catch (error) {
    console.error("Error while refreshing:", error);
  } finally {
    setRefreshing(false);
  }
};


  // Load data when the screen is focused
useFocusEffect(
  useCallback(() => {
    loadData();
  }, [loadData])
);


  // Delete transaction handler
  const handleDelete = async (id) => {
    Alert.alert("Delete Transaction", "Are you sure you want to delete this transaction?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteTransactions(id) },
    ]);
  };

  // Show loader if initially loading
  if (loading && !refreshing) return <PageLoader />;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>

        {/* Balance Summary */}
        <BalanceCard summary={summary} />

        {/* Transactions Header */}
        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>

      {/* Transactions List */}
      <FlatList
  style={styles.transactionsList}
  contentContainerStyle={styles.transactionsListContent}
  data={transactions}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <TransactionItem item={item} onDelete={handleDelete} />}
  ListEmptyComponent={<NoTransactionsFound />}
  showsVerticalScrollIndicator={false}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={['#4CAF50']} // Android
      tintColor="#4CAF50"   // iOS
      title="Refreshing..."
      titleColor="#4CAF50"
    />
  }
/>

    </View>
  );
}
