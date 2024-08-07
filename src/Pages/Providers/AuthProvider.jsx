import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";
import app from "../../Firebase/firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('Current user: ', currentUser.email);

            if (currentUser) {
                setLoading(false);
            } else {
                setLoading('true');
            }
        });
        return () => {
            unsubscribe();
        }
    }, []);

    const updateUserProfile = (userInfo) => {
        updateProfile(auth.currentUser, userInfo);
    }

    const authInfo = {
        user,
        loading,
        createUser,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;