// AuthContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { auth } from '../Firebase/firebase';
import { getIdToken, onIdTokenChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface User {
  uid: string;
  role: 'admin' | 'seller' | 'customer';
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

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await getIdToken(firebaseUser, true); // force refresh token
        const idTokenResult = await firebaseUser.getIdTokenResult();

        const userData: User = {
          uid: firebaseUser.uid,
          role: idTokenResult.claims.role as User['role'] || 'customer'
        };


        localStorage.setItem('accessToken', token);
        setUser(userData);
      } else {
        setUser(null);
        localStorage.removeItem('accessToken');
      }
    });

    return () => unsubscribe();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const refreshToken = async () => {
    if (auth.currentUser) {
      const token = await getIdToken(auth.currentUser, true);
      localStorage.setItem('accessToken', token);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
