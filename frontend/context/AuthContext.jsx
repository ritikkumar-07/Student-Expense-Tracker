import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('student_expense_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // Save user whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        'student_expense_user',
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem('student_expense_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);

    try {
      // Temporary frontend authentication.
      // Replace this with your backend API later.
      const savedUsers = JSON.parse(
        localStorage.getItem('student_expense_users') || '[]'
      );

      const existingUser = savedUsers.find(
        (item) =>
          item.email === email &&
          item.password === password
      );

      if (!existingUser) {
        throw new Error('Invalid email or password');
      }

      const loggedInUser = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
      };

      setUser(loggedInUser);

      return {
        success: true,
        user: loggedInUser,
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);

    try {
      const savedUsers = JSON.parse(
        localStorage.getItem('student_expense_users') || '[]'
      );

      const alreadyExists = savedUsers.some(
        (item) => item.email === email
      );

      if (alreadyExists) {
        throw new Error('An account with this email already exists');
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
      };

      savedUsers.push(newUser);

      localStorage.setItem(
        'student_expense_users',
        JSON.stringify(savedUsers)
      );

      const loggedInUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };

      setUser(loggedInUser);

      return {
        success: true,
        user: loggedInUser,
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updatedData) => {
    setUser((currentUser) => {
      if (!currentUser) return currentUser;

      const updatedUser = {
        ...currentUser,
        ...updatedData,
      };

      // Update saved session
      localStorage.setItem(
        'student_expense_user',
        JSON.stringify(updatedUser)
      );

      // Update registered user as well
      try {
        const users = JSON.parse(
          localStorage.getItem('student_expense_users') || '[]'
        );

        const updatedUsers = users.map((item) =>
          item.id === currentUser.id
            ? { ...item, ...updatedData }
            : item
        );

        localStorage.setItem(
          'student_expense_users',
          JSON.stringify(updatedUsers)
        );
      } catch {
        // Ignore localStorage parsing errors
      }

      return updatedUser;
    });
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside an AuthProvider'
    );
  }

  return context;
}

export default AuthContext;