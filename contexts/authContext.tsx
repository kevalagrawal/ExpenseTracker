import { authenticate, firestore } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native"; // for loading

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authenticate, async (firebaseUser) => {
            if (firebaseUser) {
                await updateUserData(firebaseUser.uid);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(authenticate, email, password);
            return { success: true };
        } catch (error: any) {
            let errorMessage = error.message || "Something went wrong";
            return { success: false, error: errorMessage };
        }
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            let response = await createUserWithEmailAndPassword(authenticate, email, password);
            await setDoc(doc(firestore, "users", response.user.uid), {
                name,
                email,
                uid: response.user.uid,
            });
            return { success: true };
        } catch (error: any) {
            let errorMessage = error.message || "Something went wrong";
            return { success: false, error: errorMessage };
        }
    };

    const updateUserData = async (uid: string) => {
        try {
            const docRef = doc(firestore, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                const userData: UserType = {
                    uid: data?.uid,
                    email: data?.email || null,
                    name: data?.name || null,
                    image: data?.image || null,
                };
                setUser({ ...userData });
            }
        } catch (error: any) {
            console.log(error.message || "Failed to update user data");
        }
    };

    const contextValue: AuthContextType = {
        user,
        setUser,
        login,
        register,
        updateUserData,
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;
