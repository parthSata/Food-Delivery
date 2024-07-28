import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { auth, db } from "@/config/Firebase/firebase";
import { getIdToken, onIdTokenChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { get, ref } from "firebase/database";
import Loader from "../Components/ReusableComponent/Loader";
import { toast } from "react-toastify";

interface User {
  uid: string;
  role: "admin" | "seller" | "customer";
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  refreshToken: () => Promise<void>;
  fetchUserRole: (uid: string) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const clearLocalStorageOnInit = () => {
      if (!auth.currentUser) {
        localStorage.removeItem("accessToken");
      }
    };

    clearLocalStorageOnInit();

    return () => {
      localStorage.removeItem("accessToken");
    };
  }, []);


  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await getIdToken(firebaseUser, true);
        localStorage.setItem("accessToken", token);

        const uid = firebaseUser.uid;
        if (uid) {
          const emailRef = ref(db, `users/${uid}`);
          const emailSnapshot = await get(emailRef);

          if (emailSnapshot.exists()) {
            const userData = emailSnapshot.val();
            setUser(userData);
          } else {
            setUser(null);
            toast.warn("No user data found for email");
          }
        } else {
          setUser(null);
          toast.warn("No email found for firebaseUser");
        }
      } else {
        localStorage.removeItem("accessToken");
        setUser(null);
        toast.warn("No firebaseUser found, user set to null");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);


  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const refreshToken = async () => {
    if (auth.currentUser) {
      const token = await getIdToken(auth.currentUser, true);
      localStorage.setItem("accessToken", token);
    }
  };

  const fetchUserRole = async (uid: string) => {
    const userDataRef = ref(db, `users/${uid}`);
    const snapshot = await get(userDataRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      return userData.role || null;
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ user, fetchUserRole, login, logout, refreshToken }}>
      <Loader isLoading={isLoading}>{children}</Loader>
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};