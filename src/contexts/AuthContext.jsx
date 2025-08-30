import { createContext, useContext, useState, useEffect } from "react";
import { login as authLogin, updateProfile } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (data) => {
    const res = await authLogin(data);
    console.log(res);
    if (res.user) {
      setUser(res.user);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);
    }
    return res;
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const updateUser = async (data) => {
    const res = await updateProfile(data);
    if (res.updatedUser) {
      setUser(res.updatedUser);
      localStorage.setItem("user", JSON.stringify(res.updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateUser,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
