import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  onIdTokenChanged
} from "firebase/auth";
import { auth } from "../lib/firebase";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}
export const AuthContext= createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    const unsubscribeToken = onIdTokenChanged(auth, async (currentUser) => {
      if (currentUser) {
        const freshToken = await currentUser.getIdToken();
        setToken(freshToken);
      } else {
        setToken(null);
      }
    });
    return () => {
      unsubscribeAuth()
      unsubscribeToken();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    const uid=userCredential.user.uid;
    const token = await userCredential.user.getIdToken();

    setToken(token);
    setUid(uid);
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

  return (
    <AuthContext.Provider value={{ user,token , login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
