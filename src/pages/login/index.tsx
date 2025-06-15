import { LoginFormData } from '@/types';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '@config/route/authContext';
import { Button, Card, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as api from '@/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>({
    username: 'zhangsan@example.com',
    password: 'a12345678',
  });

  const onFinish = async (values: LoginFormData) => {
    console.log('Received values of form: ', values);
    const res = await api.login(values);
    login(res);
    message.success('登录成功');
    navigate('/search');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   // 当浏览器对特定事件（如链接点击、表单提交）有预设行为时（如跳转页面或刷新），
  //   // e.preventDefault() 可取消这些默认操作。‌‌
  //   e.preventDefault();

  //   console.log('Login attempt with:', formData);
  //   // api.login(formData);

  //   // const  loginInfo  = useContext(AuthContext);
  //   // console.log(loginInfo);
  //   login('', 'abc');
  //   navigate('/book');
  //   // Here you would typically call an authentication API
  // };

  const handleForgotCredentials = () => {
    console.log('Forgot credentials clicked');
    // Navigate to password recovery page
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f0f2f5',
      }}
    >
      <Card title="航班订票系统登录" style={{ width: 400 }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
            initialValue={formData.username}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
            initialValue={formData.password}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              登录
            </Button>
            <p className="text-[14px] font-normal text-[#6b7782] font-['Plus_Jakarta_Sans'] text-center mt-4">
              还没有账号?{' '}
              <Link to="/register" className="text-[#6b7782]">
                立即注册
              </Link>
            </p>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
