import React, { createContext, useState, useContext, ReactNode } from 'react';

// useState 用于在函数组件
// useContext 在组件树中传递数据的方式

// 定义登录信息的类型
interface LoginInfo {
  userId: string;
  phone: string;
  email: string;
  name: string;
  accessToken: string;
}

// 定义上下文类型
interface AuthContextType {
  loginInfo: LoginInfo | null;
  login: (userinfo: LoginInfo) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  // isAuthenticated: boolean;
}

// 创建上下文
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 创建提供者组件
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo | null>(null);
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // 登录函数
  const login = (userinfo: LoginInfo) => {
    try {
      setLoginInfo({ ...userinfo });
      // setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      // setIsAuthenticated(false);
    }
  };

  // 登出函数
  const logout = () => {
    setLoginInfo(null);
    // setIsAuthenticated(false);
  };

  // 判断是否已登录
  const isAuthenticated = () => !!(loginInfo && loginInfo.accessToken);

  return (
    <AuthContext.Provider value={{ loginInfo, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// 创建自定义钩子
export const useAuth = (): AuthContextType => {
  console.log(AuthContext);
  const context = useContext(AuthContext);
  console.log(context);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
