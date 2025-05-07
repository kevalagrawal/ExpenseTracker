// /contexts/authContext.tsx

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { authenticate, firestore } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authenticate, async (firebaseUser) => {
            if (firebaseUser) {
                await updateUserData(firebaseUser.uid);
            } else {
                setUser(null);
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
            const errorMessage = error.message || "Something went wrong during login";
            return { success: false, error: errorMessage };
        }
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            const response = await createUserWithEmailAndPassword(authenticate, email, password);
            const uid = response.user.uid;
            const userData: UserType = { uid, email, name, image: null };

            await setDoc(doc(firestore, "users", uid), userData);
            setUser(userData);
            return { success: true };
        } catch (error: any) {
            const errorMessage = error.message || "Something went wrong during registration";
            return { success: false, error: errorMessage };
        }
    };

    const updateUserData = async (uid: string) => {
        try {
            const userDoc = await getDoc(doc(firestore, "users", uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                const userData: UserType = {
                    uid: data.uid,
                    email: data.email || null,
                    name: data.name || null,
                    image: data.image || null,
                };
                setUser(userData);
            }
        } catch (error: any) {
            console.error("Failed to update user data:", error.message);
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
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export default AuthProvider;
