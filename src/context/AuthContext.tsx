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

interface User {
  uid: string;
  role: "admin" | "seller" | "customer";
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await getIdToken(firebaseUser, true); // force refresh token
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
            console.log("No user data found for email:", uid);
          }
        } else {
          setUser(null);
          console.log("No email found for firebaseUser:", firebaseUser);
        }
      } else {
        localStorage.removeItem("accessToken");
        setUser(null);
        console.log("No firebaseUser found, user set to null");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    console.log("User logged in:", userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    navigate("/login");
    console.log("User logged out");
  };

  const refreshToken = async () => {
    if (auth.currentUser) {
      const token = await getIdToken(auth.currentUser, true);
      localStorage.setItem("accessToken", token);
      console.log("Token refreshed:", token);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshToken }}>
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