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
import { child, get, ref } from "firebase/database";
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
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await getIdToken(firebaseUser, true); // force refresh token
        localStorage.setItem("accessToken", token);
        const userDataRef = ref(db, "users");

        const mobileNumber: any = firebaseUser.phoneNumber;
        let userData: User | null = null;

        if (mobileNumber) {
          const mobileArray = mobileNumber.split("");
          mobileArray.splice(0, 3); // Remove the first 3 characters
          const mobileWithoutCallingCode = mobileArray.join("");
          const snapshot = await get(
            child(userDataRef, `${mobileWithoutCallingCode}`)
          );

          if (snapshot.exists()) {
            userData = snapshot.val();
          }
        } else {
          // If no phone number, try to get user data by email or some other identifier
          const email = firebaseUser.email;
          if (email) {
            const emailRef = ref(db, "usersByEmail");
            const emailSnapshot = await get(
              child(emailRef, email.replace(".", "%2E"))
            );
            if (emailSnapshot.exists()) {
              userData = emailSnapshot.val();
            }
          }
        }

        if (userData) {
          setUser(userData);
        } else {
          setUser(null);
        }
      } else {
        localStorage.removeItem("accessToken");
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
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
