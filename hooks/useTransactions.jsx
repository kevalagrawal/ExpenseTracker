import { useCallback, useState } from "react"
import { Alert } from "react-native"


const API_URL = "https://expense-backendone.onrender.com/api"

export const useTransactions=(userId)=>{
    const [transactions,setTransactions]=useState([]);
    const [summary,setSummary] = useState({
        balance:0,
        income:0,
        expenses:0
    });
    const [loading,setLoading] = useState(false);

    const fetchTransactions = useCallback(async()=>{
        try {
            const response = await fetch(`${API_URL}/transactions/${userId}`)
            const data = await response.json();
            // console.log(data)
            setTransactions(Array.isArray(data) ? data : []);
            // console.log(transactions)
        } catch (error) {
            console.error("Error fetching transactions: ",error);
            setTransactions([]);
        }
    },[userId])
    const fetchSummary = useCallback(async()=>{
        try {
            const response = await fetch(`${API_URL}/transactions/summary/${userId}`)
            const data = await response.json();
            setSummary(data);
        } catch (error) {
            console.error("Error fetching summary: ",error);
        }
    },[userId])

    const loadData = useCallback(async()=>{
        if(!userId) return;

        setLoading(true);
        try {
            await Promise.all([fetchTransactions(),fetchSummary()]);
        } catch (error) {
            console.error("Error loading data",error);
        }
        finally{
            setLoading(false);
        }
    },[fetchTransactions,fetchSummary,userId])

    const deleteTransactions=async(id)=>{
        try {
            const response = await fetch(`${API_URL}/transactions/${id}`,{method:"DELETE"})
            console.log(response)
            if(!response.ok) {
                throw new Error(Error.message);}

            loadData();
        } catch (error) {
            console.log("Error in deleting the transaction: ",error);
            Alert.alert("Error",error.message)
        }
    }
    return {transactions,summary,loading,loadData,deleteTransactions}
}