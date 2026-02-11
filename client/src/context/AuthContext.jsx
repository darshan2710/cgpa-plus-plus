import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('cgpaplus_token'));
  const [loading, setLoading] = useState(true);

  const API = axios.create({
    baseURL: '/api',
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });

  useEffect(() => {
    if (token) {
      API.get('/auth/me')
        .then(res => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('cgpaplus_token');
          setToken(null);
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    localStorage.setItem('cgpaplus_token', res.data.token);
    setToken(res.data.token);
    setUser(res.data);
    return res.data;
  };

  const register = async (name, email, college, password) => {
    const res = await API.post('/auth/register', { name, email, college, password });
    localStorage.setItem('cgpaplus_token', res.data.token);
    setToken(res.data.token);
    setUser(res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('cgpaplus_token');
    setToken(null);
    setUser(null);
  };

  const api = axios.create({
    baseURL: '/api',
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, api }}>
      {children}
    </AuthContext.Provider>
  );
};
