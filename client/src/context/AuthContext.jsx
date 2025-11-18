import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('user') || 'null')
  );
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const login = async (emailOrUsername, password) => {
    const { data } = await api.post('/users/login', { emailOrUsername, password });
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
  };

  const signup = async (payload) => {
    const { data } = await api.post('/users/register', payload);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateUserFromProfile = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  useEffect(() => {
    // token expiry handling could be added here later
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, updateUserFromProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
