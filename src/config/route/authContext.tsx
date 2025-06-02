import React, { createContext, useState, useContext } from 'react';

// 定义登录信息的类型
interface LoginInfo {
  username: string;
  token: string;
}

// 定义上下文类型
interface AuthContextType {
  loginInfo: LoginInfo | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  // isAuthenticated: () => void;
}


// 创建上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
// 创建提供者组件
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const [loginInfo, setLoginInfo, isAuthenticated, setIsAuthenticated] = useState<LoginInfo | null>(null);

  // 登录函数
  const login = (username: string, token: string) => {
    try {
      setLoginInfo({ username, token: token});
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
    }
  };

  // 登出函数
  const logout = () => {
    setLoginInfo(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ loginInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 创建自定义钩子
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
