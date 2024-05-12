import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const { exp } = decodedToken;
        if (exp < Date.now() / 1000) {
          // Token expired
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
        } else {
          // Token valid
          setIsAuthenticated(true);
          setUser({ username: decodedToken.username });
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAuthenticated(false);
        setUser(null);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/'; // Redirect to home page
  };
useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return { isAuthenticated, user, logout , token };
};
